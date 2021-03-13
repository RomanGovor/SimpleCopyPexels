import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {setLanguage} from "../../../utils/storage/storageLang";
import {actionsCommon} from "../../../redux/commonReducer";

type PropsType = {
    lang: string
}

const SelectLang: React.FC<PropsType> = ({lang}) => {
    const selectRef = useRef(null);
    const dispatch = useDispatch();

    const selectLang = () => {
        // @ts-ignore
        const lang = selectRef?.current?.value;
        setLanguage(lang);
        dispatch(actionsCommon.setLanguage(lang));
    }

    return (
        <div className={'select-lang'}>
            <select value={lang} ref={selectRef} onChange={selectLang}>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="by">Беларускі</option>
            </select>
        </div>
    )
}

export default SelectLang;
