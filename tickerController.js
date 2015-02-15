 function TickerController($scope,tickerService){

   this.searchSubject = new Rx.Subject();
   this.tickerService=tickerService;
   this.$scope = $scope;
   this.searchString="";
   this.companies=[];
   this.subscriptions = {};
   this.disposables={};
   this.selectedCompany;

    var that = this;
    this.searchSubject
      .throttle(500)
      .selectMany(function(str)
          {
            console.log(str);
            return that.tickerService.companySearch(str) ;
            })
          .subscribe(function(resp){
            that
              that.companies.length=0;
              _.forEach(resp, function(x){
                that.companies.push(x);
              });

              that.$scope.$apply();
            console.log('Search response len: ' + that.companies.length);
          }, function(err){
        console.error(err);
      });



     TickerController.prototype.onSearchChanged = function(){
        this.searchSubject.onNext(this.searchString);
      }
      TickerController.prototype.companySelected=function(){
        console.log(this.selectedCompany);
        var that = this;
        var disp = this.tickerService.createTickersubscription(this.selectedCompany)
          .subscribe(function(tick){
            console.log(tick);
            that.subscriptions[tick.symbol] = tick;
            that.$scope.$apply();
          }, function(err){
            console.log("err in subs " + err);
          });
          this.disposables[this.selectedCompany.FIELD1] = disp;
      }
      TickerController.prototype.endSubscription=function(subscription){
        console.log("unsubscribing " + subscription);
        this.disposables[subscription.symbol].dispose();
      }
}
