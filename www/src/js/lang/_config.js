var config_lang= {
    default:'en',
    ru:'ru',
    en:'en',
    us:'en',
    cn:'cn',

    am:'lt',
    az:'az',
    bg:'bg',
    de:'de',
    es:'es',
    ge:'ge',
    it:'it',
    kz:'kz',
    lt:'lt',
    lv:'lv',
    nl:'nl',
    pl:'pl',
    ro:'ro',
    ua:'ua'
};
function select_lang(lang) {
    if(!lang || lang ==''){
        return swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            confirmButtonText: _chat_e('Ок'),
            showCancelButton: false,
            type: 'error',
            title: _chat_e('Ошибка!'),
            text: _chat_e('Вы не выбрали язык который хотите использовать!')
        });
    }
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        showCancelButton: false,
        showConfirmButton: false,
        type: 'info',
        title: _chat_e('Загрузка...'),
        text: ''
    });
    localStorage.setItem('lang',lang);
    location.reload();
}