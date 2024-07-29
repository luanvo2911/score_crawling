import React from "react";
import { Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const Token = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <div className="font-bold flex flex-col items-center">
        <Typography.Title level = {2}>Nhập bearer token để biết điểm</Typography.Title>
        <Search
          placeholder="Bearer Token"
          loading={loading}
          enterButton
          onSearch={(value: string) => {
            navigate(`/main?token=${value}`)
            setLoading(!loading);
          }}
        />
        {
          loading ? <Typography.Text>Đang tìm kiếm kết quả ...</Typography.Text> : ""
        }
      </div>
    </div>
  );
};

export default Token;
