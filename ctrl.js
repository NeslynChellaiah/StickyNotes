/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'accUtils', 'ojs/ojarraydataprovider', "ojs/ojbootstrap", "ojs/ojactioncard", 'ojs/ojinputtext'],
 function(ko, accUtils, ArrayDataProvider, Bootstrap,  ojactioncard) {
    function DashboardViewModel() {
     
      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "My UI";
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };

      this.toDo = ko.observable();
      let arr = [];
      // this.CurrentTime = ko.observable();
      // let time = new Date().toLocaleTimeString();
      $.ajax({
        type: "GET",
        url: "http://127.0.0.1:3000/data/",
        dataType: "json",
        async: false,
        success: function (data) {
          console.log(data.list);
          arr = data["list[]"];
        },
        error: function (result) {
            alert("404 json server not found");
        }
      });

      this.list = ko.observableArray(arr);

      this.search = () => {
        window.open("https://www.google.com/search?&q="+this.toDo());
        this.toDo("");
      };

      this.update = (arr) => {
        $.ajax({
          type: "PATCH",
          url: "http://127.0.0.1:3000/data/",
          dataType: "json",
          async: false,
          data: {
            "list[]": arr
          },
          success: function (data) {
              arr = data.list;
          },
          error: function (result) {
              alert("404 json server not found");
          }
        });
      };

      this.addToList = () => {
        let newElement = this.toDo();
        if (newElement === undefined) {
          return;
        }
        else {
          newElement = newElement.trim();
          if (newElement != ""){
          arr.push(newElement);
          this.list(arr);
          console.log(this.list()); 
          this.update(this.list());
          this.toDo("")
          }
        }
      };

      this.remove = (event) => {
        console.log(event.originalTarget.textContent);
        let currentElement = event.originalTarget.textContent;
        currentElement = currentElement.trim();
        let tempArr = arr.filter(element => element != currentElement);
        arr = tempArr;
        this.list(arr);
        this.update(this.list());
        console.log(tempArr);
      };

    }


    return DashboardViewModel;
  }
);
