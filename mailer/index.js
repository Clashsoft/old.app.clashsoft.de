const subject = document.getElementById('subject');
const template = document.getElementById('template');
const addresses = document.getElementById('addresses');
const variables = document.getElementById('variables');
const mailtoList = document.getElementById('mailto-list');

subject.value = localStorage.getItem('subjectTemplate') || '';
template.value = localStorage.getItem('bodyTemplate') || '';
addresses.value = localStorage.getItem('addresses') || '';
variables.value = localStorage.getItem('variables') || '';

update();

function replaceVariables(body, variables) {
	for (let i = 0; i < variables.length; i++) {
		body = body.replace(`#${i + 1}#`, variables[i] || '');
	}
	return body;
}

function update() {
	const subjectTemplate = subject.value || '';
	const bodyTemplate = template.value || '';
	const addressesText = addresses.value || '';
	const variablesText = variables.value || '';

	localStorage.setItem('subjectTemplate', subjectTemplate);
	localStorage.setItem('bodyTemplate', bodyTemplate);
	localStorage.setItem('addresses', addressesText);
	localStorage.setItem('variables', variablesText);

	const addressList = addressesText.split('\n');
	const variableList = variablesText.split('\n');

	const maxRows = Math.max(addressList.length, variableList.length);
	addresses.rows = maxRows + 2;
	variables.rows = maxRows + 2;

	let mailtoLinks = '';
	for (let i = 0; i < addressList.length; i++) {
		const recipient = addressList[i];
		const variables = (variableList[i] || '').split('\t');

		const subject = replaceVariables(subjectTemplate, variables);
		const body = replaceVariables(bodyTemplate, variables);

		mailtoLinks += `<a href="mailto:${recipient}?subject=${encodeURIComponent(
			subject)}&body=${encodeURIComponent(body)}">mailto:${recipient}</a><br/>\n`;
	}
	mailtoList.innerHTML = mailtoLinks;
}
