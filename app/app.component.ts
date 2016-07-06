import { Component} from '@angular/core'
import { BillerList } from './biller-list.component'
import { WuService, WuBiller } from './wu.service'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ BillerList ],
  providers: [ WuService ]
})
export class AppComponent  {
  title = 'Western Union'
  subTitle = 'Look Up Your Biller'
  amountLabel = 'Amount'
  queryLabel = 'Biller name'
  currencyLabel = 'USD'
  ctaLabel = 'Get Fees'
  estimatedFeesLabel = 'Fees for Paying Bills'

  selectedBiller: WuBiller
  query: string
  amount: number

  feeEstimates: any[]
  isLoadingFeeEstimates: boolean
  errorMessage: string

  constructor(private wuService: WuService) {}  

  onBillerSelected(biller: WuBiller) {
    this.selectedBiller = biller
    this.feeEstimates = null
    if (biller) {
      this.query = biller.companyName
    }
  }

  getFeeEstimates() {
    this.isLoadingFeeEstimates = true
    this.feeEstimates = null
    this.errorMessage = null

    this.wuService.getFeeInquiryEstimated(
      this.selectedBiller, 
      this.amount)
      .then(data => {
        this.isLoadingFeeEstimates = false
        this.feeEstimates = data
      })
      .catch(error => {
        this.isLoadingFeeEstimates = false
        this.errorMessage = error
      });
  }

}