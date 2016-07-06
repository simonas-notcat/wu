import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import WuApiParams  from './wu-api-params'

@Injectable()
export class WuService {
  constructor(private http: Http) { }

  session: WuSession = null
  serviceUrl = 'https://www.westernunion.com/presentationservice/rest/api/v1.0/'
  headers = new Headers({'Content-Type': 'text/plain'})

  getFeeInquiryEstimated(biller: WuBiller, amount: number): Promise<any> {
    return this.getSession().then(session => {
      var params = WuApiParams.feeInquiryEstimated
      params.security = session.security
      params.biller = { 
        company_name: biller.companyName,
        code: biller.code,
        currency_iso_code: biller.currencyIsoCode,
        country_iso_code: biller.countryIsoCode
      }

      return this.http.post(
          this.serviceUrl + 'FeeInquiryEstimated', 
          JSON.stringify(params), 
          {headers: this.headers})
       .toPromise()
       .then(res => res.json())
       .then(json => {
         var result = []
         if (json.serviceOptions && json.serviceOptions.serviceOption) {
           //Converting data structure to simple array
           for (let key1 in json.serviceOptions.serviceOption) {
             for (let key2 in json.serviceOptions.serviceOption[key1]) {
               result.push(json.serviceOptions.serviceOption[key1][key2][0])
             }
           }
         }
         return Promise.resolve(result)
       })
       .catch(this.handleError);
    })
  }

  getBillers(query): Promise<WuBiller[]> {
    return this.getSession().then(session => {
      var params = WuApiParams.getBillers
      params.security = session.security
      params.biller.company_name = query 

      return this.http.post(
          this.serviceUrl + 'GetBillers', 
          JSON.stringify(params),
          {headers: this.headers})
       .toPromise()
       .then(res => res.json())
       .then(json => json.billers ? json.billers.biller : [])
       .catch(this.handleError);
    })
  }

  private getSession(): Promise<WuSession> {
    if (this.session) {
      return Promise.resolve(this.session)
    }

    return this.http.post(
       this.serviceUrl + 'CreateSession', 
       JSON.stringify(WuApiParams.createSession), 
       {headers: this.headers})
     .toPromise()
     .then(function(res) : Promise<WuSession> {
       this.session = res.json()
       return Promise.resolve(this.session)
     }.bind(this))
     .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }
}

export class WuSession {
  security: {
    session: {
      id: string
    },
    clientIp: string,
    dataCenter: string
  };
  ps_version: string;
}

export class WuBiller {
  companyName: string
  industry: string
  code: string
  currencyIsoCode: string
  countryIsoCode: string
  activeFlag: string
  prePaid: string
  preConfig: string
  accountRequired: string
  language: string
}
