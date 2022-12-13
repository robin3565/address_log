import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillQuestionCircle, AiFillExclamationCircle } from "react-icons/ai";

const Notify = () => {
  const [infoState, setInfoState] = useState("safe");
  const [etc, setEtc] = useState(false);

  const fetchApi = async (data) => {
    console.log(data)
    await axios
      .post("http://localhost:8080/notify", {
        options: data.options,
        address: data.address,
        main_net: data.main_net,
        option_contents: data.contents,
      })
      .then((res) => {
        if (res.data.result === "OK") {
          alert(`저장 되었습니다.`);
          console.log(res.data);
          window.location.reload();
        }
      });
  };

  const onSubmit = async (data) => {
    fetchApi(data);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  return (
    <div className="notify">
      <div className="layoutfix">
        <div className="leftTitle">
          <h4>암호화폐 지갑주소 정보 등록</h4>
          <p>
            여러분의 진실된 목소리로 더욱 <em>안전</em>하고 <em>편리</em>한{" "}
            <br></br>
            화폐거래 시장을 만들어가겠습니다.
          </p>
        </div>
        <form className="content" onSubmit={handleSubmit(onSubmit)}>
          <div className="subBox">
            <div className="subTitle">
              <b>암호화폐 정보 등록</b>
            </div>
            <ul>
              <li>
                <h6 className="sub-sub-Title">
                  암호화폐 종류 <em>*</em>
                </h6>
                <select
                  {...register("main_net", {
                    required: "종류 선택은 필수입니다.",
                  })}
                >
                  <option value="" defaultValue>
                    선택
                  </option>
                  <option name="BTC" value="BTC">
                    비트코인(BTC)
                  </option>
                  <option name="ETH" value="ETH">
                    이더리움(ETH)
                  </option>
                  <option name="BNB" value="BNB">
                    BNB(BNB)
                  </option>
                  <option name="XRP" value="XRP">
                    리플(XRP)
                  </option>
                  <option name="DOGE" value="DOGE">
                    도지 코인(DOGE)
                  </option>
                  <option name="ADA" value="ADA">
                    에이다(ADA)
                  </option>
                  <option name="MATIC" value="MATIC">
                    폴리곤(MATIC)
                  </option>
                  <option name="DOT" value="DOT">
                    폴카닷(DOT)
                  </option>
                  <option name="SOL" value="SOL">
                    솔라나(SOL)
                  </option>
                  <option name="etc" value="etc">
                    기타
                  </option>
                </select>
                <p role="alert" className="alert"><AiFillExclamationCircle />{errors.main_net?.message}</p>
              </li>
              <li>
                <h6 className="sub-sub-Title">
                  암호화폐 지갑주소 <em>*</em>
                </h6>
                <input
                  type="text"
                  placeholder="예) 0fda7asfdsaf8asdfs89sdafsf8d9sqerw8"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "지갑 주소를 입력해주세요.",
                    },
                  })}
                />
                <p role="alert" className="alert"><AiFillExclamationCircle />{errors.address?.message}</p>
              </li>
            </ul>
          </div>
          {/*  */}
          <div className="subBox">
            <div className="subTitle">
              <b>암호화폐 안전 정보 등록</b>
              <div className="comment">
                안전 정보를 통해 해당 지갑주소의 안전 정도를 파악하고 있어요!
              </div>
            </div>
            <div className="btnBox">
              <a
                className={`${infoState === "safe" ? "clicked" : ""}`}
                onClick={() => setInfoState("safe")}
              >
                <em>안전해요</em>
              </a>
              {/* 위험해요 클릭시 describe 에 active 클래스 추가*/}
              <a
                className={`${infoState === "safe" ? "" : "danger"}`}
                onClick={() => setInfoState("danger")}
              >
                <em>위험해요</em>
              </a>
            </div>
          </div>

          {/*  */}
          {infoState === "danger" && (
            <>
              <div className="subBox">
                <div className="subTitle">
                  <b>암호화폐 피해 내용</b>
                  <p>
                    <em>정확한 내용</em>을 바탕으로 작성해 주세요.
                  </p>
                </div>
                <h6 className="sub-sub-Title">
                  피해 종류 <em>*</em>
                </h6>
                <label htmlFor="userSex" className="form-label"></label>
                <div className="form_toggle row-vh d-flex flex-row justify-content-between">
                  <div className="form_radio_btn radio_male">
                    <input
                      id="radio-1"
                      type="radio"
                      name="a"
                      value="1"
                      {...register("options", {
                        required: {
                          value: true,
                          message: "선택 사항은 필수입니다.",
                        },
                      })}
                      onClick={() => setEtc(false)}
                    />
                    <label htmlFor="radio-1">거래 사기</label>
                  </div>
                  <div className="form_radio_btn">
                    <input
                      id="radio-2"
                      type="radio"
                      name="a"
                      value="2"
                      {...register("options", {
                        required: {
                          value: true,
                          message: "선택 사항은 필수입니다.",
                        },
                      })}
                      onClick={() => setEtc(false)}
                    />
                    <label htmlFor="radio-2">환전 사기</label>
                  </div>
                  <div className="form_radio_btn">
                    <input
                      id="radio-3"
                      type="radio"
                      name="a"
                      value="3"
                      {...register("options", {
                        required: {
                          value: true,
                          message: "선택 사항은 필수입니다.",
                        },
                      })}
                      onClick={() => setEtc(false)}
                    />
                    <label htmlFor="radio-3">보이스피싱</label>
                  </div>
                  <div className="form_radio_btn">
                    <input
                      id="radio-4"
                      type="radio"
                      name="a"
                      value="4"
                      {...register("options", {
                        required: {
                          value: true,
                          message: "선택 사항은 필수입니다.",
                        },
                      })}
                      onClick={() => setEtc(false)}
                    />
                    <label htmlFor="radio-4">로맨스 스캠</label>
                  </div>
                  <div className="form_radio_btn">
                    <input
                      id="radio-5"
                      type="radio"
                      name="a"
                      value="5"
                      {...register("options", {
                        required: {
                          value: true,
                          message: "선택 사항은 필수입니다.",
                        },
                      })}
                      onClick={() => setEtc(true)}
                    />
                    <label htmlFor="radio-5">기타</label>
                  </div>
                </div>
                {etc && (
                  <div>
                    <div className="alertBox">
                      <AiFillExclamationCircle />
                      <em>
                        피해 종류에 대해 <b>간략히</b> 서술해 주세요.
                      </em>
                    </div>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="예) 무슨 사기"
                      {...register("contents")}
                    />
                  </div>
                )}
                <p role="alert" className="alert"><AiFillExclamationCircle />{errors.options?.message}</p>
              </div>
            </>
          )}
          {/*  */}
          <div className="submitBox">
            <button type="submit" className="submitBtn" disabled={isSubmitting}>
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notify;
