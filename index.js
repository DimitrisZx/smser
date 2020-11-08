class SMSHelper {

  formHelper;
  constructor() {
    this.formHelper = new FormHelper();
    this.sendSms = this.sendSms.bind(this);
   }

  _smsTemplate(numericCode, name, address) {
  
    return `${numericCode} ${name} ${address}`;
  }

  sendSms() {
    const { code, name, address } = this.formHelper.getFormData()
    console.log(this._smsTemplate(code, name, address))
  }
}

class FormHelper {

  codeField = document.querySelector('#input-code')
  nameField = document.querySelector('#input-name')
  addressField = document.querySelector('#input-address')
  submitButton = document.querySelector('#submit')
  isSubmitActive = false;

  getFormData = () => ({
    code: this.codeField.value,
    name: this.nameField.value,
    address: this.addressField.value,
  })

  constructor() {
    this.codeField.addEventListener('input', () => this.validateInput())
    this.nameField.addEventListener('input', () => this.validateInput())
    this.addressField.addEventListener('input', () => this.validateInput())
  }

  toggleSubmit(isEnabled) {
    this.submitButton.disabled = !isEnabled;
    const getMobileOperatingSystem = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
      if (/android/i.test(userAgent)) {
        return "Android";
      }
      
      if (/iPhone/.test(userAgent) && !window.MSStream) {
        return "iOS";
      }
    
      return "unknown";
    }

    let specialCharacter = '';
    if (getMobileOperatingSystem() === 'Android') {
      specialCharacter = '?';
    } else if(getMobileOperatingSystem() === 'iOS') {
      specialCharacter = '&'
    }
    const smsLink = `sms:13033${specialCharacter}body=${this.codeField.value} ${this.nameField.value} ${this.addressField.value}`;
    this.submitButton.setAttribute('href', smsLink)
  }


  validateInput() {
    this.codeField.value.length > 0 && 
    this.nameField.value.length > 0 && 
    this.addressField.value.length > 0 
      ? this.toggleSubmit(true)
      : this.toggleSubmit(false)    
  }
}

const smsClient = new SMSHelper();