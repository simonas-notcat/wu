import { 
  Component, 
  OnChanges, 
  SimpleChange, 
  Input, 
  Output, 
  EventEmitter } from '@angular/core';
import { WuService, WuBiller } from './wu.service';

@Component({
  selector: 'biller-list',
  templateUrl: 'app/biller-list.component.html',
  providers: [ WuService ]
})
export class BillerList implements OnChanges{
  @Input() query: string
  @Input() selectedBiller: WuBiller
  @Output() onBillerSelected = new EventEmitter<WuBiller>()

  isLoading: boolean
  billers: WuBiller[] = []
  errorMessage: string

  constructor(private wuService: WuService) {}

  private search() {
    this.isLoading = true
    this.errorMessage = null
    this.wuService.getBillers(this.query)
      .then(data => {
        this.isLoading = false
        this.onBillerSelected.emit(null)
        this.billers = data
      })
      .catch(error => {
        this.isLoading = false
        this.errorMessage = error
      });
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    if (changes['query'] 
        && changes['query'].previousValue !== changes['query'].currentValue) {
      if (!changes['selectedBiller'] 
          || (changes['selectedBiller'] 
              && changes['selectedBiller'].currentValue 
              && changes['selectedBiller'].currentValue.companyName != changes['query'].currentValue))
      this.search();  
    }
  }

  selectBiller(biller: WuBiller) {
    this.onBillerSelected.emit(biller)
  }
}