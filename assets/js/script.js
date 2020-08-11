class App {
    constructor() {
        this.age = '';
        this.weight = '';
        this.height = '';
        this.gender = ''
        this.activityLevel = '';

        this.resultContainerEl = document.getElementById('result');
        this.formEl = document.getElementById('form');
        this.handleSubmit();
    }

    handleSubmit() {
        this.formEl.onsubmit = event => {
            event.preventDefault();

            this.age = this.getInputNumberValue('age');
            this.weight = this.getInputNumberValue('weight');
            this.height = this.getInputNumberValue('height');
            this.gender = this.getSelectedValue('gender');
            this.activityLevel = this.getSelectedValue('activity_level');
            
            const tmb = Math.round((
                gender === 'female'
                    ? (655 + (9.6 * this.weight) + (1.8 * this.height - (4.7 * this.age)))
                    : (66 + (13.7 * this.weight) + (5 * this.height - (6.8 * this.age)))
            ));

            const maintenance = Math.round((tmb * Number(this.activityLevel)));
            const loseWeight = maintenance - 450;
            const gainWeight = maintenance + 450;

            const layout = this.renderLayout(tmb, maintenance, loseWeight, gainWeight);

            this.resultContainerEl.innerHTML = layout;

        };
    }

    getSelectedValue(id) {
        const selected = document.getElementById(id);
        return selected.options[selected.selectedIndex].value;
    }

    getInputNumberValue(id) {
        return Number(document.getElementById(id).value);
    }



    renderLayout(tmb, maintenance, loseWeight, gainWeight) {
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
}

new App();