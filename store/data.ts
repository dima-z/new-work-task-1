import { action, makeAutoObservable } from 'mobx';

class ObservableStore {
  data: {
    name: string;
    id: number;
    last: string;
    lowestAsk: string;
    highestBid: string;
    percentChange: string;
    baseVolume: string;
    quoteVolume: string;
    isFrozen: string;
    postOnly: string;
    high24hr: string;
    low24hr: string;
  }[] = [];

  isPending = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData() {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 4000);
    if (!this.isPending) {
      this.isPending = true;
      await fetch('https://poloniex.com/public?command=returnTicker', {
        signal: controller.signal,
      })
        .then(
          (response) => {
            try {
              return response.json();
            } catch (e) {
              if (e instanceof Error) {
                console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack);
              }

              this.isError = true;
            }
          },
          action('fetchError', (e) => {
            if (e instanceof Error) {
              console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack);
            }

            this.isError = true;
            this.isPending = false;
          })
        )
        .then(
          action('fetchSuccess', (json) => {
            this.data = [];
            if (json) {
              try {
                for (const k in json) {
                  const item = json[k];
                  this.data.push({
                    name: k,
                    id: item.id,
                    last: item.last,
                    lowestAsk: item.lowestAsk,
                    highestBid: item.highestBid,
                    percentChange: item.percentChange,
                    baseVolume: item.baseVolume,
                    quoteVolume: item.quoteVolume,
                    isFrozen: item.isFrozen,
                    postOnly: item.postOnly,
                    high24hr: item.high24hr,
                    low24hr: item.low24hr,
                  });
                }

                this.isError = false;
              } catch (e) {
                if (e instanceof Error) {
                  console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack);
                }

                this.isError = true;
              }
            } else {
              console.log('No data received!');
              this.isError = true;
            }

            this.isPending = false;
          }),
          action('fetchError', (e) => {
            console.log('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack);
            this.isError = true;
            this.isPending = false;
          })
        );
    }
  }
}

export default new ObservableStore();
