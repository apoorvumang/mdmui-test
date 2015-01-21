var app=angular.module("sample",[]);
app.controller("formController",function($scope,$http)

{
	$scope.json=""
	$scope.show=true
	$scope.show_form=false

	$scope.getForm=function()
	{
		var response=$http.get("sample1.json")
		response.success(function (data){
			formObject=data
			for (var i in formObject.form.fields)
					{
						if($.inArray(formObject.form.fields[i].type,["text","number","date","email","tel","time","url","search","range","password","month","file","datetime"] )>-1)
						{
							 formObject.form.fields[i].type2= formObject.form.fields[i].type
							 formObject.form.fields[i].type="input"

						}
					}
			console.log(formObject)
			$scope.json=formObject
			$scope.show_form=true
			$scope.name=$scope.json.form.name


		} );
	}
});
	
