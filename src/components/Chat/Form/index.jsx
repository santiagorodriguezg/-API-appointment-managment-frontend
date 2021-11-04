import { Button, Input, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import S from './styles';

const Form = ({ message, setMessage, clientRef, chatUser }) => {
  const onChange = e => {
    if (e.target.value !== ' ') setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (clientRef.current?.readyState === WebSocket.OPEN) {
      if (message.trim()) {
        clientRef.current.send(
          JSON.stringify({
            command: 'create_message',
            data: {
              room_name: window.location.pathname.substring('/chat/'.length),
              user_receiver: chatUser.username,
              content: message.trim(),
            },
          }),
        );
      }
      setMessage('');
    }
  };

  return (
    <S.ChatForm>
      {/* <Tooltip title="Emojis"> */}
      {/*  <Button size="large" icon={<SmileOutlined />} /> */}
      {/* </Tooltip> */}
      <Input.TextArea
        autoSize={{
          minRows: 1,
        }}
        size="large"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={onChange}
      />
      <Tooltip title="Enviar">
        <Button size="large" icon={<SendOutlined />} onClick={sendMessage} disabled={message === ''} />
      </Tooltip>
    </S.ChatForm>
  );
};

export default Form;
