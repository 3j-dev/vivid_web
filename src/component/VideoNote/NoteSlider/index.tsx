import { NoteSliderContainer, ButtonContainer, Buttons } from './style';
import { NOTE_TYPE } from '../Constant';

interface Props {
  nowNoteType: number;
  setNowNoteType: React.Dispatch<React.SetStateAction<number>>;
  setDropdownActivated: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteSlider: React.FC<Props> = ({ setNowNoteType, nowNoteType }: Props) => {
  return (
    <NoteSliderContainer>
      <Buttons>
        <ButtonContainer
          onClick={() => setNowNoteType(NOTE_TYPE.MARKDOWN)}
          activated={nowNoteType === NOTE_TYPE.MARKDOWN}
        >
          텍스트
        </ButtonContainer>
        <ButtonContainer
          onClick={() => setNowNoteType(NOTE_TYPE.CANVAS)}
          activated={nowNoteType === NOTE_TYPE.CANVAS}
        >
          그리기
        </ButtonContainer>
      </Buttons>
    </NoteSliderContainer>
  );
};

export default NoteSlider;
