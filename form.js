function getForm()
	{
		document.getElementById("gf").style.display="none"
		xhr=new XMLHttpRequest()
		xhr.open("GET","sample1.json",true);
		xhr.onreadystatechange=function()
		{
			//alert("here")
			if(xhr.readyState==4 && xhr.status==200)
			{
				formJSON=JSON.parse(xhr.responseText);
				generateForm(formJSON);

			}
			else if(xhr.readyState==4)
			{
				alert("connection problem, "+xhr.status)
				xhr.abort();
			} 
		}
		xhr.send();	
		//console.log("here")
	}

function generateForm(formObject)
{
	var container=document.createElement("div")
	container.className+="container"
	var form=document.createElement("form")
	form.setAttribute('id',formObject.form.id)
	form.setAttribute('name',formObject.form.name)
	//console.log("generateForm");
	//console.log(form)
	for (var i in formObject.form.fields)
	{
		form.appendChild(generateFormElement(formObject.form.fields[i]));
	}

	container.appendChild(form)
	container.innerHTML+=" <button type='button' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-send'></span> Send </button>"
	document.body.appendChild(container)
}

function generateFormElement(field)
{
	//console.log("generateFormElement")
	var element=document.createElement("div")
	element.className+="form-group"
	//console.log(field.type)
	if ($.inArray(field.type,["text","number","date","email","tel","time","url","search","range","radio","password","month","file",""])>-1)
	{	
		label=document.createElement("label")
		label.className+="text-capitalize"
		label.innerHTML=field.label
		input=document.createElement("input")
		input.setAttribute("type",field.type);
		input.className+="form-control"
		element.appendChild(label)
		element.appendChild(input)
		//console.log(element)
	}
	else if (field.type=="select")
	{
		label=document.createElement("label")
		label.className+="text-capitalize"
		label.innerHTML=field.label
		select=document.createElement("select")
		select.setAttribute("id",field.id)
		select.setAttribute("name",field.name)
		select.className+="form-control"
		element.appendChild(select)
		for(var i in field.options)
		{
			var option=document.createElement("option")
			option.setAttribute("value",field.options[i].value)
			option.setAttribute("id",field.options[i].id)
			option.innerHTML=field.options[i].value
			select.appendChild(option)

		}
		element.appendChild(select)
	}
	return element;
}
