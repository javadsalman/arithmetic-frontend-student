import { LangContent, getTranslationWithContent } from "../../HOC/Translation.tsx/Translation";

export const content: LangContent = {
    'az': {
        'Daxil olmaq istədiyin bölməni seç!': 'Daxil olmaq istədiyin bölməni seç!',
        'FORMULLAR': 'FORMULLAR',
        'ƏMƏLLƏR': 'ƏMƏLLƏR',
        'TESTLƏR': 'TESTLƏR'
    },
    'en': {
        'Daxil olmaq istədiyin bölməni seç!': 'Choose the section you want to enter!',
        'FORMULLAR': 'FORMULAS',
        'ƏMƏLLƏR': 'OPERATIONS',
        'TESTLƏR': 'TESTS'
    },
    'ru': {
        'Daxil olmaq istədiyin bölməni seç!': 'Выберите раздел, в который хотите войти!',
        'FORMULLAR': 'ФОРМУЛЫ',
        'ƏMƏLLƏR': 'ОПЕРАЦИИ',
        'TESTLƏR': 'ТЕСТЫ'
    },
    'tr': {
        'Daxil olmaq istədiyin bölməni seç!': 'Girmek istediğiniz bölümü seçin!',
        'FORMULLAR': 'FORMÜLLER',
        'ƏMƏLLƏR': 'İŞLEMLER',
        'TESTLƏR': 'TESTLER'
    },
    'pl': {
        'Daxil olmaq istədiyin bölməni seç!': 'Wybierz sekcję, do której chcesz wejść!',
        'FORMULLAR': 'FORMUŁY',
        'ƏMƏLLƏR': 'OPERACJE',
        'TESTLƏR': 'TESTY'
    },
    'kk': {
        'Daxil olmaq istədiyin bölməni seç!': 'Кіргіңіз келетін бөлімді таңдаңыз!',
        'FORMULLAR': 'ФОРМУЛАЛАР',
        'ƏMƏLLƏR': 'ОПЕРАЦИЯЛАР',
        'TESTLƏR': 'ТЕСТТЕР'
    }
}

export default getTranslationWithContent(content);
