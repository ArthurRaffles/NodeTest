 function TickerController($scope,tickerService){

   this.searchSubject = new Rx.Subject();
   this.tickerService=tickerService;
   this.$scope = $scope;
   this.searchString="";
   this.companies=[];
   this.subscriptions = {};
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
        this.tickerService.createTickersubscription(this.selectedCompany)
          .subscribe(function(tick){
            console.log(tick);
            that.subscriptions[tick.symbol.FIELD1] = tick;
            that.$scope.$apply();
          }, function(err){
            console.log("err in subs " + err);
          });
      }
}
