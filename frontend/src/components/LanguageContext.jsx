import React, {createContext, useState } from 'react'
import i18n from '../i18n'

export const LanguageContext = createContext();

export const LanguageProvider =({children})=>{
    //initialize with i18n's current language
    const [language,setLanguage] = useState(i18n.language||'en')

    //change language function

    const  changeLang =(lng)=>{
        i18n.changeLanguage(lng)
        setLanguage(lng)
    }

    return(
        <LanguageContext.Provider value={{language,changeLang}}>
            {children}
        </LanguageContext.Provider>
      
    )
}