
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const age = getInputNumberValue('age');
    const weight = getInputNumberValue('weight');
    const height = getInputNumberValue('height');
    const gender = getSelectedValue('gender');
    const activityLevel = getSelectedValue('activity_level');

    const tmb = Math.round((
        gender === 'female'
            ? (655 + (9.6 * weight) + (1.8 * height - (4.7 * age)))
            : (66 + (13.7 * weight) + (5 * height - (6.8 * age)))
    ));

    const maintenance = Math.round((tmb * Number(activityLevel)));
    const loseWeight = maintenance - 450;
    const gainWeight = maintenance + 450;


    const layout = renderLayout(tmb, maintenance, loseWeight, gainWeight);
    const result = document.getElementById('result');

    result.innerHTML = layout;
}

function getSelectedValue(id) {
    const selected = document.getElementById(id);
    return selected.options[selected.selectedIndex].value;
}

function getInputNumberValue(id) {
    return Number(document.getElementById(id).value);
}

function renderLayout(tmb, maintenance, loseWeight, gainWeight) {
    return `
    <h2>Aqui está o resultado:</h2>

    <div class="result-content">
        <ul>
        <li>
            Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
            Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
        </li>
        <li>
            Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
        </li>
        <li>
            Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
        </ul>
    </div>`;
}
