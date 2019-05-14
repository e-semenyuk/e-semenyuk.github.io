import { Component, OnInit } from '@angular/core';
import { Currency } from '../../shared/currency';
import { CurrencyService } from '../../services/currency.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'currency-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  public currencies: Currency[];
  public prevCurrencies: Currency[];
  public selectedCurrency: Currency;
  public showSpinner: boolean = true;

  public flags: string[] = [
    'aud',
    'bgn',
    'uah',
    'dkk',
    'usd',
    'eur',
    'pln',
    'irr',
    'isk',
    'jpy',
    'cad',
    'cny',
    'kwd',
    'mdl',
    'nzd',
    'nok',
    'rub',
    'xdr',
    'sgd',
    'kgs',
    'kzt',
    'try',
    'gbr',
    'czk',
    'sek',
    'chf'
  ];

  constructor(private currencyService: CurrencyService,
              private dateService: DateService) { }

  public getCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date)
      .subscribe(currencies => this.currencies = currencies);
  }

  public getPrevCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date)
      .subscribe(currencies => {
        setTimeout(()=>this.showSpinner = false, 1500);
        return this.prevCurrencies = currencies;
      });
  }

  public getDif(index: number): number {
    let result: number = 0;
    let prevRate: number = 0;
    let curRate: number = 0;

    prevRate = Number(this.prevCurrencies[index].Cur_OfficialRate);
    curRate = Number(this.currencies[index].Cur_OfficialRate);

    result = prevRate - curRate;

    return result;
  }

  public onSelect(selectedCurrency: Currency): void {
    this.selectedCurrency = this.currencies
      .find(currency => currency.Cur_ID === selectedCurrency.Cur_ID);
  }

  ngOnInit() {
    this.getCurrencies();
    this.getPrevCurrencies(this.dateService.getDateNthDayAgo(1));
    this.currencyService.selectedCurrency.subscribe(currency => this.onSelect(currency));
  }
}
