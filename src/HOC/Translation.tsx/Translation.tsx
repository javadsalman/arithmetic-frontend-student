import { useLanguageStore, LanguageCode, DEFAULT_LANGUAGE } from "../../stores/languageStore";
import { memo } from "react";


export type LangContent = {
    [key in LanguageCode]?: {
        [key: string]: string;
    };
}

interface TranslationProps {
    children: string;
    content: LangContent;
}

function Translation({children, content}: TranslationProps) {
    const { language } = useLanguageStore();
    if (language !== DEFAULT_LANGUAGE && content[language] && children in content[language]) {
        return <>{content[language][children]}</>;
    }
    return <>{children}</>;


}



export function getTranslationWithContent(content: LangContent) {
    return (props: {children: string}) => <Translation {...props} content={content} />;
}



export default memo(Translation);

