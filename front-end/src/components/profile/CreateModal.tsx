import React, { useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import instance from 'apis/instance';
import { FormContainer } from './ModifyModalStyles';
import { ModalOverlay, ModalContent, FlexContainer, HeaderContainer } from './CreateModalStyles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b6d36f',
    },
  },
});

interface CreateModalProps {
  onClose: () => void;
  getProfiles: () => void;
}

const CreateModal = ({ onClose, getProfiles }: CreateModalProps) => {
  const [name, setChildName] = useState('');
  const [birth, setChildBirth] = useState('');
  const [gender, setChildGender] = useState('');
  const [school, setChildSchool] = useState('');
  const [grade, setChildGrade] = useState('');
  const [isSchoolCorrect, setIsSchoolCorrect] = useState(false);
  const namePattern = /^[가-힣]{2,4}$/;

  const handleCreateProfile = async () => {
    if (!name.trim() || !birth || !gender || !school || !grade) {
      Swal.fire({
        text: '모든 정보를 입력해주세요!',
        icon: 'error',
        confirmButtonText: '닫기',
      });
      return;
    }

    // const now = new Date().getFullYear();
    // const birthYear = Number(birth.slice(0, 4)); // 올해와 생일 비교해서 6~10세의 생일만 가능하도록
    // if (now > birthYear) {}

    if (!isSchoolCorrect) {
      Swal.fire({
        text: '학교 확인을 해주세요!',
        icon: 'error',
        confirmButtonText: '닫기',
      });
      return;
    }

    const isValidName = namePattern.test(name);
    if (!isValidName) {
      Swal.fire({
        text: '이름을 다시 입력해주세요!',
        icon: 'error',
        confirmButtonText: '닫기',
      });
      return;
    }

    try {
      const profileData = { name, birth, gender, school, grade };
      const response = await instance.post(`/children`, profileData);
      console.log('프로필 생성 성공:', response);
      console.log(profileData);
      Swal.fire({
        text: '프로필을 생성했습니다!',
        icon: 'success',
        confirmButtonText: '닫기',
      }).then(() => {
        getProfiles();
        onClose();
      });
    } catch (error) {
      console.log('프로필 생성실패:', error);
    }
  };

  const handleSchoolCheck = async () => {
    try {
      const response = await instance.post(`/open-api/schools`, {
        keyword: school,
      });
      setIsSchoolCorrect(response.data.data);
      if (response.data.data) {
        Swal.fire({
          text: '올바른 학교정보입니다!',
          icon: 'success',
          confirmButtonText: '닫기',
        });
      } else {
        Swal.fire({
          text: '다시 입력해주세요!',
          icon: 'error',
          confirmButtonText: '닫기',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: '잘못된 입력입니다!',
        icon: 'error',
        confirmButtonText: '닫기',
      });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ThemeProvider theme={theme}>
          <FormContainer>
            <HeaderContainer>
              <h2>{'아이 프로필 생성'}</h2>
              <IconButton onClick={onClose}>
                <CloseIcon fontSize={'large'} />
              </IconButton>
            </HeaderContainer>
            <FlexContainer>
              <TextField
                label={'아이 이름'}
                variant={'outlined'}
                placeholder={'홍길동'}
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setChildName(event.target.value)
                }
                sx={{ width: '65%', marginBottom: '1rem' }}
              />
              <ToggleButtonGroup
                color={'primary'}
                value={gender}
                exclusive
                sx={{ marginLeft: 'auto' }}
                size={'large'}
                onChange={(_, newGender) => setChildGender(newGender)}
              >
                <ToggleButton value={'M'}>{'남성'}</ToggleButton>
                <ToggleButton value={'W'}>{'여성'}</ToggleButton>
              </ToggleButtonGroup>
            </FlexContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'생년월일'}
                onChange={(newDate: dayjs.Dayjs | null) => {
                  if (newDate) {
                    setChildBirth(newDate.format('YYYY-MM-DD'));
                  }
                }}
                format={'YYYY-MM-DD'}
                sx={{ marginBottom: '1rem' }}
              />
            </LocalizationProvider>
            <FlexContainer>
              <TextField
                label={'학교 이름'}
                variant={'outlined'}
                value={school}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setChildSchool(event.target.value)
                }
                sx={{ width: '65%', marginBottom: '1rem' }}
                InputProps={{
                  endAdornment: <InputAdornment position={'end'}>{'초등학교'}</InputAdornment>,
                }}
                helperText={isSchoolCorrect && '학교 등록이 완료되었습니다.'}
                disabled={isSchoolCorrect && true}
              />
              <Button
                variant={'contained'}
                size={'large'}
                sx={{
                  width: '25%',
                  padding: '0.7rem',
                  marginLeft: 'auto',
                  fontSize: '18px',
                }}
                onClick={handleSchoolCheck}
              >
                {'학교확인'}
              </Button>
            </FlexContainer>
            <ToggleButtonGroup
              color={'primary'}
              value={grade}
              exclusive
              fullWidth
              onChange={(_, newGrade) => setChildGrade(newGrade)}
            >
              <ToggleButton value={'1'}>{'1학년'}</ToggleButton>
              <ToggleButton value={'2'}>{'2학년'}</ToggleButton>
              <ToggleButton value={'3'}>{'3학년'}</ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant={'contained'}
              size={'large'}
              sx={{ padding: '0.4rem', marginTop: '1rem', fontSize: '20px' }}
              onClick={handleCreateProfile}
            >
              {'생성하기'}
            </Button>
          </FormContainer>
        </ThemeProvider>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateModal;
