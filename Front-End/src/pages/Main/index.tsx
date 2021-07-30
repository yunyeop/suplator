import axios from 'axios';
import { FocusEvent, useRef, useState } from 'react';
import { useEffect } from 'react';

const Main = () => {
  const didMount = useRef(false);

  const [sourceValue, setSourceValue] = useState<string>('');
  const [targetValue, setTargetValue] = useState<string>('');

  useEffect(() => {
    const getTranslatedValue = async () => {
      console.log(didMount)
      const { data } = await axios.get<string>(`http://localhost:1029/translate/papago?text=${sourceValue}&source=ko&target=en`);
      setTargetValue(data);
    };

    if (didMount.current) {
      getTranslatedValue();
    } else {
      didMount.current = true;
    }
  }, [sourceValue]);

  const handleFoucsOut = (e: FocusEvent<HTMLInputElement>) => {
    const sourceValue = e.target.value;

    if (sourceValue.length > 0) {
      setSourceValue(sourceValue);
    }
  }

  return (
    <>
      <div>
        input your text
      </div>
      <input
        type="text"
        onBlur={handleFoucsOut} />
      <div>{targetValue}</div>
    </>
  );
}

export default Main;