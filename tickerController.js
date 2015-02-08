 function TickerController(tickerService){

   this.searchSubject = new Rx.Subject();
   this.tickerService=tickerService;
   this.searchString="";
   this.companies;
   this.selectedCompany;

    var that = this;
    this.searchSubject
      .throttle(300)
      .selectMany(function(str)
          {
            return that.tickerService.companySearch(str) ;
            })
          .subscribe(function(resp){
            that.companies = resp;
            console.log('Search response len: ' + that.companies.length);
          }, function(err){
        console.error(err);
      });



     TickerController.prototype.onSearchChanged = function(){
        this.searchSubject.onNext(this.searchString);
      }
}
