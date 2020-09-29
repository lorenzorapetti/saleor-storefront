import { Formik } from "formik";
import React from "react";
import { pick } from "lodash";

import * as S from "./styles";
import { IProps } from "./types";
import { TextField } from "@components/molecules";
import { useIntl } from "react-intl";
import { CreditCardInput } from "@components/atoms";
import { CreditCardField } from "@components/atoms/CreditCardInput/types";

const initialValues: Record<CreditCardField | "nameOnCard", string> = {
  nameOnCard: "",
  cardNumber: "",
  cvc: "",
  expiryDate: "",
};

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  const intl = useIntl();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // processPayment(values.status);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <S.Form
          id={formId}
          ref={formRef}
          onSubmit={handleSubmit}
          data-test="dummyPaymentGatewayForm"
        >
          <TextField
            name="nameOnCard"
            label={intl.formatMessage({ defaultMessage: "Name on Card" })}
            value={values.nameOnCard}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <CreditCardInput
            values={pick(values, Object.values(CreditCardField))}
            onChange={handleChange}
            label={intl.formatMessage({ defaultMessage: "Card number" })}
            onBlur={handleBlur}
          ></CreditCardInput>
        </S.Form>
      )}
    </Formik>
  );
};

export { DummyPaymentGateway };
