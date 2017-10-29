var WtcLegal = Ractive.extend({
    oninit: function () {
        console.log('Bonus.oninit !');
        $(".__nano").nanoScroller();
        $('input, select').styler({
            selectSearch: false
        });
        $("#ex21").bootstrapSlider();
        ractiveComponent['wtc-LegalApp'].set('MyProfile', MyProfile);
        Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {
            if (!cards || cards.length == 0) cards = false;

            ractiveComponent['wtc-LegalApp'].set('finance_cards', cards);
            if (alldata) {
                ractiveComponent['wtc-LegalApp'].set('wallets', alldata.wallet);
                ractiveComponent['wtc-LegalApp'].set('finance_debit_coin', alldata.wallet["debit-coin-gold"]);
                ractiveComponent['wtc-LegalApp'].set('finance_cards_load', true);
            }

        });

    },
    onrender: function () {
        console.log('Bonus.onrender !');

    },
    oncomplete: function () {
        console.log('Bonus.oncomplete !');
    }

});

ractiveComponent['wtc-LegalApp'].on('openToggle', function (e, id) {
    $('body .guarantee-wrapper .credit-main-area .toggle .body-' + id).toggle('');
});