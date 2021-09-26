import { useContext, useState } from 'react';
import { Avatar, Badge, Col, Row, Upload } from 'antd';
import { RightOutlined, UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import AuthContext from '../../context/Auth';
import { UpdateMyProfileService } from '../../services/Users';
import S from './styles';

const ProfileCardItem = ({ title, content, showIcon = true, ...props }) => {
  return (
    <S.ListItem {...props}>
      <Row>
        <Col xs={24} md={8}>
          <S.Title>{title}</S.Title>
        </Col>
        <Col xs={19} md={14}>
          <S.Content>{content}</S.Content>
        </Col>
        <Col xs={5} md={2}>
          {showIcon && (
            <S.Icon>
              <RightOutlined />
            </S.Icon>
          )}
        </Col>
      </Row>
    </S.ListItem>
  );
};

const ProfileCardItemPhoto = () => {
  const { user, setUser } = useContext(AuthContext);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [showUploadList, setShowUploadList] = useState(true);

  const uploadImage = async ({ onSuccess, onError, file }) => {
    try {
      setShowUploadList(true);
      const fmData = new FormData();
      fmData.append('picture', file);

      const res = await UpdateMyProfileService(fmData);

      setShowUploadList(false);
      setDefaultFileList([]);
      setUser({
        ...user,
        picture: res.data.picture,
      });

      onSuccess(res.data);
    } catch (err) {
      onError({ err });
    }
  };

  const onChange = ({ fileList }) => {
    setDefaultFileList(fileList);
  };

  return (
    <S.UploadPhoto title="Clic para cambiar la foto de perfil">
      <ImgCrop rotate modalTitle="Seleccionar foto de perfil" modalOk="Guardar">
        <Upload
          accept=".jpg,.jpeg,.png,.webp"
          listType="picture"
          maxCount={1}
          customRequest={uploadImage}
          onChange={onChange}
          showUploadList={showUploadList}
          defaultFileList={defaultFileList}
        >
          <S.Photo>
            <Badge count={<S.IconCamera />} offset={[-60, 105]}>
              {user?.picture ? (
                <img src={user.picture} alt={user.fullName} />
              ) : (
                <Avatar size={120} icon={<UserOutlined />} />
              )}
            </Badge>
          </S.Photo>
        </Upload>
      </ImgCrop>
      <S.Content>Foto de perfil</S.Content>
    </S.UploadPhoto>
  );
};

export { ProfileCardItemPhoto };

export default ProfileCardItem;
