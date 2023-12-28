import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AgreementPage.css';
import { Link, useNavigate } from 'react-router-dom';

function AgreementPage() {

    const navigate = useNavigate();

    const [allAgreements, setAllAgreements] = useState(false);
    const [serviceAgreement, setServiceAgreement] = useState(false);
    const [privacyAgreement, setPrivacyAgreement] = useState(false);

    const handleAllAgreementsChange = () => {
        const newValue = !allAgreements;
        setAllAgreements(newValue);
        setServiceAgreement(newValue);
        setPrivacyAgreement(newValue);
    };
// 
    const handleServiceAgreementChange = () => {
        setServiceAgreement(!serviceAgreement);
        
        if (!privacyAgreement) {
            setAllAgreements(false);
        } else if (!serviceAgreement && privacyAgreement) {
            setAllAgreements(true);
        } else {
            setAllAgreements(!serviceAgreement || !privacyAgreement);
        }
    };
    
    const handlePrivacyAgreementChange = () => {
        setPrivacyAgreement(!privacyAgreement);
    
        if (!serviceAgreement) {
            setAllAgreements(false);
        } else if (serviceAgreement && !privacyAgreement) {
            setAllAgreements(true);
        } else {
            setAllAgreements(!serviceAgreement || !privacyAgreement);
        }
    };

    const agreementSubmit = () => {
        if (serviceAgreement && privacyAgreement) {
        console.log('유효성 검사 통과');
        navigate('/join')
        } else {
        alert('이용약관에 모두 동의해야 합니다.');
        }
    };


    const cencel = () => {
        navigate('/');
      }

    return (
        <div className='AgreementPage-container'>
            <div className='AgreementPage-container2'>
                <label className='agreement-label1'>
                    <b className='Agreement-b1'>아래 이용약관에 모두 동의합니다.</b>
                    <input
                        type="checkbox"
                        checked={allAgreements}
                        onChange={handleAllAgreementsChange}
                        className='Agreement-check1'
                    />
                </label><br/><br/>

                <label className='agreement-label2'>
                    <b className='Agreement-b2'>서비스 이용약관 동의</b>
                    <input
                        type="checkbox"
                        checked={serviceAgreement}
                        onChange={handleServiceAgreementChange}
                        className='Agreement-check2'
                    />
                </label>

                <div className='Agreement-section1'>
                    제1조 (목적)<br/><br/>

                    1. 본 이용약관은 The Festa(이하 "사이트")의 서비스 이용에 관한 조건과 절차, 이용자와 사이트 운영자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    제2조 (정의)<br/><br/>

                    2. "사이트"는 The Festa를 의미합니다.
                    "이용자"는 "사이트"에 접속하여 이 약관에 따라 "사이트"가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                    "회원"은 "사이트"에 개인정보를 제공하여 회원등록을 한 자로서, "사이트"의 정보를 지속적으로 제공받으며, "사이트"가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                    제3조 (서비스의 제공 및 변경)<br/><br/>

                    3. "사이트"는 이용자에게 다양한 정보와 서비스를 제공합니다. 이에 대한 구체적인 내용은 "사이트"의 정책에 따릅니다.
                    "사이트"는 필요한 경우 사전 고지 없이 서비스 내용을 추가, 변경, 중단할 수 있습니다.
                    제4조 (이용자의 의무 및 책임)<br/><br/>

                    4. "이용자"는 본 약관 및 관련 법령을 준수하여야 하며, 기타 "사이트"의 안내에 따라 서비스를 이용해야 합니다.
                    "이용자"는 본인의 개인정보를 보호하기 위해 비밀번호 등을 적절히 관리해야 합니다.
                    "이용자"는 "사이트"를 통해 얻은 정보를 무단으로 수정, 복제, 배포하는 행위를 하여서는 안됩니다.
                    제5조 (게시물의 관리)<br/><br/>

                    5."이용자"가 "사이트"에 작성하는 게시물은 해당 "이용자"가 직접 책임져야 합니다.
                    "사이트"는 부적절한 내용의 게시물이나 타인의 권리를 침해하는 게시물에 대해 사전 통지 없이 삭제할 수 있습니다.
                    제6조 (책임 제한)<br/><br/>

                    6. "사이트"는 천재지변, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로 발생한 이용자의 손해에 대해 책임을 지지 않습니다.
                    "사이트"는 "이용자" 간 또는 "이용자"와 제3자 간의 상호 작용으로 발생한 분쟁에 대해 어떠한 책임도 지지 않습니다.
                    제7조 (분쟁의 해결)<br/><br/>

                    7. 본 이용약관에 따른 분쟁에 대해서는 대한민국 법률을 적용하며, 관할 법원은 "사이트" 소재지의 법원으로 합니다.
                    제8조 (유의사항)<br/><br/>

                    8. 본 약관의 내용은 수시로 변경될 수 있으며, 변경된 약관은 "사이트" 내 공지사항에 게시함으로써 효력이 발생합니다.
                    "이용자"는 본 약관 및 "사이트"의 운영 정책을 주기적으로 확인하여야 합니다.
                    본 이용약관은 2023년 12월 14일부터 시행됩니다.
                </div><br/>

                <label className='agreement-label3'>
                    <b className='Agreement-b3'>개인정보 수집 및 이용 동의</b>
                    <input
                        type="checkbox"
                        checked={privacyAgreement}
                        onChange={handlePrivacyAgreementChange}
                        className='Agreement-check3'
                    />
                </label>
                
                <div className='Agreement-section2'>
                    1. 수집 및 이용 목적<br/><br/>
                    본 서비스는 [The Festa]에서 제공하는 축제 정보 제공 및 회원 관리를 위한 목적으로 아래와 같은 개인정보를 수집하고 있습니다.
                    * 회원 가입 및 관리<br/><br/>
                    * 필수항목: 아이디, 비밀번호, 이메일 주소<br/><br/>

                    2. 수집하는 개인정보의 항목<br/><br/>
                    본 서비스에서 수집하는 개인정보의 항목은 다음과 같습니다.
                    회원 가입 시: 아이디, 비밀번호, 이메일 주소<br/><br/>
                    
                    3. 개인정보의 보유 및 이용 기간<br/><br/>
                    본 서비스는 회원이 서비스를 탈퇴하거나 개인정보 제공 동의를 철회할 때까지 개인정보를 보유하며, 법령에 따른 기간 동안 보관될 수 있습니다.<br/><br/>

                    4. 개인정보의 제3자 제공<br/><br/>
                    본 서비스는 원칙적으로 회원의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br/><br/>
                    법률에 의거하거나, 수사기관에서 요청이 있는 경우<br/><br/>
                    서비스 제공을 위해 필요한 업무를 외부에 위탁하는 경우<br/><br/>

                    5. 개인정보의 파기<br/><br/>
                    개인정보의 수집 및 이용 목적 달성, 그리고 법령에 따른 기간이 경과한 경우에는 개인정보를 지체 없이 파기합니다.<br/><br/>

                    6. 개인정보 수집 및 이용 동의 거부 권리<br/><br/>

                    본 서비스는 개인정보 수집 및 이용에 대한 동의를 거부할 권리를 가지고 있습니다. 단, 동의를 거부할 경우 가입이 제한될 수 있습니다.
                </div>
                <h1 className='Agreement-text'>*모든 이용약관에 동의하셔야 회원가입 진행이 가능합니다.</h1><br/>
            </div>
            <div className='button-container'>
                <button type="button" onClick={agreementSubmit} className='Agreement-button'>
                확인
                </button>
                <button type="button" onClick={cencel} className='Agreement-cencel-button'>
                취소
                </button>
            </div>
        </div>
    )
}

export default AgreementPage;