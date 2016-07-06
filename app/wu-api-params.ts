let WuApiParams = {
  createSession: {
    device: {
      id: "",
      type: "WEB"
    },
    channel: {
      name: "Western Union",
      type: "WEB",
      version: "9Z00"
    },
    external_reference_no: "1",
    locale: {
      country_code: "US",
      language_code: "en"
    },
    security: {
      black_box_data: null,
      client_ip: "245024209201"
    },
    bashPath: "/us/en/"
  },

  getBillers: {
    security: null,
    external_reference_no:"1",
    biller: { 
      company_name: null 
    },
    max_records: "10",
    search_key: "ALL",
    bashPath: "/us/en/"
  },

  feeInquiryEstimated: {
    security: null,
    biller: { 
      company_name: null,
      code: null,
      currency_iso_code: null,
      country_iso_code: null
    },
    sender: {
      address: {
        country_iso_code: "US"
      }
    },
    origination_channels: {
      channel: [
        {
          type: "WEB",
          version: "9Z00"
        },
        {
          type: "AGT",
          version: "9Z00"
        },
        {
          type: "IVR",
          version: "9Z00"
        }
      ]
    },
    reference_location: {
      address: {
        country_iso_code: "US"
      }
    },
    payment_details: {
      origination: {
        principal_amount: "3",
        currency_iso_code: "USD",
        country_iso_code: "US"
      },
      destination: {
        currency_iso_code: "USD",
        country_iso_code: "US"
      },
      promotion: {},
      payment_type: "ALL"
    },
    inquiry_type: "BILL_PAYMENT_FEE",
    inquiry_accuracy: "ESTIMATED",
    version: 2,
    bashPath: "/us/en/"
  }
}

export default WuApiParams