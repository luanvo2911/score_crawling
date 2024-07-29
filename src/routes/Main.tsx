/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Typography } from "antd";
import axios from "axios";
import _ from "lodash";
import React from "react";
import { useSearchParams } from "react-router-dom";

const getGPA = (score: number) => {
  if (score > 10) return 0;
  else if (score >= 8.5) return 4;
  else if (score >= 8) return 3.5;
  else if (score >= 7) return 3;
  else if (score >= 6.5) return 2.5;
  else if (score >= 5.5) return 2;
  else if (score >= 5) return 1.5;
  else if (score >= 4) return 1;
  else return 0;
};

const columns = [
  {
    title: "Mã môn học",
    dataIndex: "MAMONHOC",
    key: "MAMH",
  },
  {
    title: "Tên môn học",
    dataIndex: "TENMONHOC",
    key: "TENMH",
  },
  {
    title: "Số tín chỉ",
    dataIndex: "SOTC",
    key: "TC",
  },
  {
    title: "Điểm thang 10",
    dataIndex: "DIEMSO",
    key: "D10",
  },
  {
    title: "Điểm thang 4",
    dataIndex: "DIEMSO",
    key: "D10",
    render: (text: string) => {
      return getGPA(Number(text));
    },
  },
];

const Main = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [result, setResult] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios({
      url: "https://mybk.hcmut.edu.vn/api/sinh-vien/chuong-trinh-dao-tao-diem-sinh-vien/v2",
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setLoading(false);
      setResult(res.data);
    });
  }, [token]);
  // console.log(result?.data?.diemSinhVien);
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography.Title>Bảng điểm sinh viên</Typography.Title>
      <div className="">
        <Table
          columns={columns}
          dataSource={result?.data?.diemSinhVien ?? ""}
          loading={loading}
          pagination={false}
          bordered
          sortDirections={["ascend"]}
          footer={() => {
            return (
              <div>
                <div>Phân tích bảng điểm</div>
                <div>
                  <div>
                    Tín chỉ tích lũy:{" "}
                    {loading
                      ? ""
                      : _.sumBy(result?.data?.diemSinhVien, (o: any) => {
                          return o?.DIEMSO >= 4 ? o.SOTC : 0;
                        })}
                  </div>
                  <div>
                    GPA thang 4:{" "}
                    {loading
                      ? ""
                      : _.sumBy(result?.data?.diemSinhVien, (o: any) => {
                          return o?.DIEMSO >= 4 && o?.DIEMSO <= 10
                            ? o.SOTC * getGPA(Number(o?.DIEMSO))
                            : 0;
                        }) /
                        _.sumBy(result?.data?.diemSinhVien, (o: any) => {
                          return o?.DIEMSO >= 4 && o?.DIEMSO <= 10 ? o.SOTC : 0;
                        })}
                    <ul>
                      <li>
                        GPA = 4:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 4
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 3.5:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 3.5
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 3:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 3
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 2.5:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 2.5
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 2:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 2
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 1.5:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 1.5
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                      <li>
                        GPA = 1:{" "}
                        {_.sumBy(
                          _.filter(
                            result?.data?.diemSinhVien,
                            (o) => getGPA(Number(o?.DIEMSO)) == 1
                          ),
                          (o: any) => {
                            return o.SOTC;
                          }
                        )}{" "}
                        tín chỉ
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Main;
