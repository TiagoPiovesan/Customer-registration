list = [
		{"name": "Tiago Vicicius", "age": "1996-09-03","RG": "5598134","phone": "4999191520969","sex": "M"},
		{"name": "Ana Paula Gabrieli", "age":"1978-09-03", "RG":"1234567", "phone":"49991741258963", "sex":"F"},
		{"name": "Suzyele de Souza", "age":"1925-09-03", "RG":"7654321", "phone":"49991456987852", "sex":"F"},
		{"name": "Cleiton Saldanha", "age":"1963-09-03", "RG":"1478523", "phone":"49991123654789", "sex":"M"},
		{"name": "Maurício de Souza", "age":"1966-09-03", "RG":"9638791", "phone":"49991159753321", "sex":"M"}
		]
//Clientes cadastrados
function amountCustumers (list) {
	for (key in list){
		key++;
	}
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
						<td id="TbName('+ key +')">'   + formatName(list[key].name)   +'</td>\
						<td id="TbBirthday('+ key +')">'+ formatAge(list[key].age)     +'</td>\
						<td id="TbRg('+ key +')">'      + formatRG(list[key].RG)       +'</td>\
						<td id="TbPhone('+ key +')">'   + formatPhone(list[key].phone) +'</td>\
						<td id="TbSex('+ key +')">'     + list[key].sex                +'</td>\
						<td><span id="save('+ key + ')"> <span id="selections('+ key + ')"> <button type="button" class="btn btn-warning btn-xs" onclick="updateData(' + key + ')">Edit</button> | <button class="btn btn-danger btn-xs" onclick="deleteData(' + key +')">Delete</button> </span> </span> </td>\
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
	var day = Number(dob.substr(7,2));
	var month = Number(dob.substr(5,2))-1;
	var year = Number(dob.substr(0,4));
	var today = new Date();
	var age = today.getFullYear()-year;
	if (today.getMonth() < month || today.getMonth() == month && today.getDate() < day) {
		age--;
	};
	return age;
}
//formatRG
function formatRG(rg){
	var aux = rg.substr(0,1) + "." + rg.substr(1,3) + "." + rg.substr(4,4);
	return aux;
}
//format phone
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

	validationData(name, age, rg, phone);

	var sex 	 = document.querySelector('input[name="sex"]:checked').value;

	if (!(validationData(name, age, rg, phone))) {
		list.unshift({'name': name, 'age': age, 'RG': rg, 'phone': phone, 'sex': sex});
		reset();
	};

	setList(list);
}

function validationData(name, age, rg, phone){
	var year = Number(age.substr(0,4));
	var currentTime = new Date()
	var thisYear = currentTime.getFullYear()


	var erros = "";
	if (name == ""){
		erros += "You don't Filled NAME! <br>";
	}else if (name.length < 5 ) {
		erros += "Full name, please! <br>";
	}else if (name.length > 35 ){
		erros += "Your name is very big <br>";
	};
	if (age == "") {
		erros += "Date of birth, Please! <br>";
	}else if (year >= thisYear) {
		erros += "This Date not is Valid <br>";
	};
	if (rg == "") {
		erros += "You don't Filled RG! <br>";
	}else if(rg.length != 7){
		erros += "RG have to do 7 caracters"
	}
	if (phone == "") {
		erros += "You don't Filled PHONE! <br>";
	};
	if (erros == "") {
		return false;
	}else{
		document.getElementById('erroValidation').style.display = 'block';
		document.getElementById('erroValidation').innerHTML = ('<p> <strong>Erro: </strong> <br>' + erros + '<p>');
		return true;
	}
}

//resetar os campos do form cadastrar cliente
function reset(){
	document.getElementById('name').value = "";
	document.getElementById('birthday').value = "";
	document.getElementById('RG').value = "";
	document.getElementById('phone').value = "";

	document.getElementById('erroValidation').style.display = 'none';
	document.getElementById('erroValidation').innerHTML = "";	
}

//criar os campos no lugar dos dados
function updateData(id){
	
	var id = id;
	var name = list[id].name;
	var age = list[id].age;
	var rg = list[id].RG;
	var phone = list[id].phone;
	var sex = list[id].sex;
	document.getElementById('TbName('+ id +')').innerHTML = "<input id='newName' class='form-control input-sm' type='text' value="+ name + ">"
	document.getElementById('TbBirthday('+ id +')').innerHTML = "<input id='newbirthday' class='form-control input-sm' type='Date' value="+ age + ">"
	document.getElementById('TbRg('+ id +')').innerHTML = "<input id='newRG' class='form-control input-sm' type='text' value="+ rg + ">"
	document.getElementById('TbPhone('+ id +')').innerHTML = "<input id='newPhone' class='form-control input-sm' type='text' value="+ phone + ">"

	if (sex == 'M') {
	document.getElementById('TbSex('+ id +')').innerHTML = "<select id='newSex' class='btn btn-mini'>\
																<option value='M' selected='selected'>M</option>\
																<option value='F'>F</option>\
															</select>"
	}else{
	document.getElementById('TbSex('+ id +')').innerHTML = "<select class=' btn btn-mini'>\
																<option value='F' selected='selected'>F</option>\
																<option value='M'>M</option>\
															</select>"	
	}

	document.getElementById('selections('+ id + ')').style.display = 'none';
	document.getElementById('save('+ id + ')').innerHTML = ('<button type="button" class="btn btn-primary btn-sm" onclick="addUpdate('+ id +')">Salvar</button>')
}

//valores refeitos
function addUpdate(id){
	name = document.getElementById('newName').value;
	age = document.getElementById('newbirthday').value;
	rg = document.getElementById('newRG').value;
	phone = document.getElementById('newPhone').value;
	sex = document.getElementById('newSex').value;

	list[id] = {'name': name, 'age': age, 'RG': rg, 'phone': phone, 'sex': sex};
	setList(list);
}


function deleteData(id){
	if (confirm("Quer mesmo deletar?")) {
		list.splice(id,1);
		setList(list);
	};
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