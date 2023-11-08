import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getRecords } from 'apis/recordApis';
import RecordListItem from '../../components/record/RecordListItem';
import { RecordPageContainer, EmptyRecord, Scroll, BackIcon } from './RecordPageStyles';
import { tokenState } from '../../atoms/Auth';
import { Profilekey } from '../../atoms/Profile';

interface Record {
  animonName: string;
  createTime: string;
  id: number;
  name: string;
  school: string;
  videoPath: string;
}

const RecordPage = () => {
  const token = useRecoilValue(tokenState);
  const childId = useRecoilValue(Profilekey);
  const [records, setRecords] = useState<Record[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecords({
      childId,
      onSuccess: data => {
        setRecords(data);
      },
      onError: () => {
        console.log('녹화 영상 불러오기 오류');
      },
    });
  }, [childId, token]);

  const getBack = () => {
    navigate('/profile');
  };

  return (
    <RecordPageContainer>
      <BackIcon onClick={getBack} />
      {records.length > 0 ? (
        <Scroll>
          {records.map(record => (
            <RecordListItem
              key={record.id}
              recordId={record.id}
              name={record.name}
              animonName={record.animonName}
              school={record.school}
              videoPath={record.videoPath}
              createTime={record.createTime}
            />
          ))}
        </Scroll>
      ) : (
        <EmptyRecord />
      )}
    </RecordPageContainer>
  );
};

export default RecordPage;
