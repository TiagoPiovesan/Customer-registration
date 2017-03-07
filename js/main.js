list = [
		{"name": "Tiago Vicicius", "age": "03/09/1996","RG": "5598134","phone": "4999191520969","sex": "M"},
		{"name": "Ana Paula Gabrieli", "age":"12/10/1991", "RG":"1234567", "phone":"49991741258963", "sex":"F"},
		{"name": "Suzyele de Souza", "age":"05/11/1990", "RG":"7654321", "phone":"49991456987852", "sex":"F"},
		{"name": "Cleiton Saldanha", "age":"17/02/1994", "RG":"1478523", "phone":"49991123654789", "sex":"M"},
		{"name": "Maurício de Souza", "age":"14/01/1972", "RG":"9638791", "phone":"49991159753321", "sex":"M"}
		]
//Clientes cadastrados
function amountCustumers (list) {
	for (key in list){
		key++;
	}
	console.log(key);
}


function setList(list){
	var table = '<thead class="title-table">\
			    	<tr class="success">\
				        <td>Name:</td>\
				        <td>Age:</td>\
				        <td>RG:</td>\
				        <td>Phone:</td>\
				        <td>Sex:</td>\
				        <td> Action </td>\
			    	</tr>\
			    </thead>\
			    <tbody>';

	for (key in list){
		table += '<tr>\
						<td>'+ formatName(list[key].name) +'</td>\
						<td>'+ formatAge(list[key].age) +'</td>\
						<td>'+ formatRG(list[key].RG) +'</td>\
						<td>'+ formatPhone(list[key].phone) +'</td>\
						<td>'+ list[key].sex +'</td>\
						<td> <button type="button" class="btn btn-warning btn-xs" onclick="updateData(' + key + ')">Edit</button> </td>\
				  </tr>'
	}
	table += '</tbody>'
	document.getElementById("tableCustumers").innerHTML = table;

    saveListStorage(list);
}
//format name capitalize upperCase fist letter
function formatName(name){
	var str = name.toLowerCase();
	return str.replace(/\b\w/g, l => l.toUpperCase());
}

//format Age
function formatAge(birth){
	var dob = birth;
	var day = Number(dob.substr(0,2));
	var month = Number(dob.substr(3,2))-1;
	var year = Number(dob.substr(6,11));
	var today = new Date();
	var age = today.getFullYear()-year;
	if (today.getMonth() < month || today.getMonth() == month && today.getDate() < day) {
		age--;
	};
	return age;
}

function formatRG(rg){
	var aux = rg.substr(0,1) + "." + rg.substr(1,3) + "." + rg.substr(4,4);
	return aux;
}

function formatPhone(phone){
	var aux = "(" + phone.substr(0,2) + ")" + " " + phone.substr(2,1) + " " + phone.substr(3,2) + " " + phone.substr(7,3) + "-" + phone.substr(10,3);
	return aux;
}

//Save data
function addData(){
	var name 	 = document.getElementById('name').value;
	var age 	 = document.getElementById('birthday').value;
	var rg 	     = document.getElementById('RG').value;
	var phone 	 = document.getElementById('phone').value;
	var sex 	 = document.querySelector('input[name="sex"]:checked').value;
	
	list.unshift({'name': name, 'age': age, 'RG': rg, 'phone': phone, 'sex': sex});


	setList(list);
}


function saveListStorage(list){
  var jsonStr = JSON.stringify(list);
  //salvano a lista no local stotage
  localStorage.setItem("list", jsonStr);
}

//iniciando o storage
function initListStorage(){
  var testeList = localStorage.getItem("list");
  if (testeList) {
    list = JSON.parse(testeList);
  }
  setList(list);
}

initListStorage();