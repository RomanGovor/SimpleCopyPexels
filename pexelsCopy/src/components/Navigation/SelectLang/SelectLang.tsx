import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../../utils/storage/storageLang';
import { actionsCommon } from '../../../redux/commonReducer';

type PropsType = {
  lang: string;
};

const SelectLang: React.FC<PropsType> = ({ lang }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();

  const selectLang = () => {
    const langTemp = selectRef?.current?.value;

    if (langTemp) {
      setLanguage(langTemp);
      dispatch(actionsCommon.setLanguage(langTemp));
    }
  };

  return (
    <div className="select-lang">
      <select value={lang} ref={selectRef} onChange={selectLang}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="by">Беларускі</option>
      </select>
    </div>
  );
};

export default SelectLang;
