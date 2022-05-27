import React  from 'react';
import FormAccountSettings from "~/components/shared/forms/FormAccountSettings";

const WidgetUserWelcome = () => {
    return (
                <div className="ps-block--user-wellcome">
                    <div className="ps-block__left">
                        <img src="/img/user/admin.jpg" alt="" />
                    </div>
                    <div className="ps-block__right">
                        <p>
                            Hello,<a href="#">Soho Store</a>
                        </p>
                    </div>
                        <div className="ps-block__action">
                            <i className="icon-exit"/>
                        </div>
                </div>
    );
};
export default WidgetUserWelcome;
