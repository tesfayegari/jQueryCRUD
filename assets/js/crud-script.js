$(document).ready(function () {
  getItems();
});

function createListItem() {
  var eName = $('#txtempname').val();
  var eDesg = $('#txtdesignation').val();
  var eEmail = $('#txtemail').val();
  var eMobile = $('#txtmobile').val();
  var eBloodGroup = $('#txtbloodgrp').val();
  var eComAddress = $('#txtaddress').val();
  var eEmergency = $('#txtemergency').val();
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items",
    method: "POST",
    data: JSON.stringify({
      '__metadata': {
        'type': 'SP.Data.EmployeeListItem'
      },
      'EmployeeName': eName,
      'Designation': eDesg,
      'Email': eEmail,
      'Mobile': eMobile,
      'BloodGroup': eBloodGroup,
      'CommunicationAddress': eComAddress,
      'EmergencyContact': eEmergency
    }),
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val()
    },
    success: function (data) {
      var eName = $('#txtempname').val("");
      var eDesg = $('#txtdesignation').val("");
      var eEmail = $('#txtemail').val("");
      var eMobile = $('#txtmobile').val("");
      var eBloodGroup = $('#txtbloodgrp').val("");
      var eComAddress = $('#txtaddress').val("");
      var eEmergency = $('#txtemergency').val("");
      swal("Item created successfully", "success");

      if ($.fn.DataTable.isDataTable('#subsiteList')) {
        $('#subsiteList').DataTable().destroy();
      }
      $('#subsiteList tbody').empty();
      getItems();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function getItems() {
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items",
    method: "GET",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"
    },
    success: function (data) {
      data = data.d.results;
      console.log(data);
      $.each(data, function (index, value) {
        var html = "<tr><td>" + value.EmployeeName + "</td><td>" + value.Designation + "</td><td>" + value.Email + "</td><td>" + value.BloodGroup + "</td><td>" + value.CommunicationAddress + "</td><td>" + value.EmergencyContact + "</td><td>" + value.Mobile + "</td><td><a href='#' data-target='#ModalForUpdateEmployee' data-toggle='modal' onclick='edit(" + value.Id + ")'><img src='assets/images/003-edit-document.png'></a></td><td><a href='#' onclick='deleteItem(" + value.Id + ");'><img src='assets/images/001-delete.png'></a></td></tr>";
        $('.table tbody').append(html);
      });
      table = $('#subsiteList').DataTable();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function edit(value) {
  $.ajax({
    async: true,
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/GetItemByID(" + value + ")",
    method: "GET",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose"

    },
    success: function (data) {
      console.log(data.d.EmployeeName);
      eName = $('#txtempnames').val(data.d.EmployeeName);
      eDesg = $('#txtdesignations').val(data.d.Designation);
      eEmail = $('#txtemails').val(data.d.Email);
      eMobile = $('#txtmobiles').val(data.d.Mobile);
      eBloodGroup = $('#txtbloodgrps').val(data.d.BloodGroup);
      eComAddress = $('#txtaddresss').val(data.d.CommunicationAddress);
      eEmergency = $('#txtemergencys').val(data.d.EmergencyContact);
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
  uId = value;
}

function update(uId) {
  var eName = $('#txtempnames').val();
  var eDesg = $('#txtdesignations').val();
  var eEmail = $('#txtemails').val();
  var eMobile = $('#txtmobiles').val();
  var eBloodGroup = $('#txtbloodgrps').val();
  var eComAddress = $('#txtaddresss').val();
  var eEmergency = $('#txtemergencys').val();

  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items(" + uId + ")",
    method: "POST",
    data: JSON.stringify({
      '__metadata': {
        'type': 'SP.Data.EmployeeListItem'
      },
      'EmployeeName': eName,
      'Designation': eDesg,
      'Email': eEmail,
      'Mobile': eMobile,
      'BloodGroup': eBloodGroup,
      'CommunicationAddress': eComAddress,
      'EmergencyContact': eEmergency
    }),
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "IF-MATCH": "*",
      "X-HTTP-Method": "MERGE"
    },
    success: function (data) {
      swal("Item Updated successfully", "success");
      if ($.fn.DataTable.isDataTable('#subsiteList')) {
        $('#subsiteList').DataTable().destroy();
      }
      $('#subsiteList tbody').empty();
      getItems();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });
}

function deleteItem(value) {
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employee')/items(" + value + ")",
    method: "POST",
    headers: {
      "accept": "application/json;odata=verbose",
      "content-type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "IF-MATCH": "*",
      "X-HTTP-Method": "DELETE"
    },
    success: function (data) {
      swal("Deleted!", "Item Deleted successfully", "success");
      if ($.fn.DataTable.isDataTable('#subsiteList')) {
        $('#subsiteList').DataTable().destroy();
      }
      $('#subsiteList tbody').empty();
      getItems();
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
  });

}