import React, { useRef, useState } from "react";
import { FormBuilder } from "@jeremyling/react-material-ui-form-builder";
import { Button } from "@mui/material";
import { get, isEmpty } from "lodash";

const fields = [
  {
    title: "Shipping Address",
    component: "display-text",
    titleProps: {
      style: {
        fontSize: 20,
        marginTop: 16,
        fontWeight: "bold",
        userSelect: "none",
        fontVariant: "small-caps",
        marginBottom: 8
      }
    }
  },
  {
    col: {
      xs: 6
    },
    label: "First Name",
    props: {
      required: true
    },
    attribute: "firstName",
    component: "text-field",
    validations: {
      label: "First Name",
      required: "Required"
    },
    validationType: "string"
  },
  {
    col: {
      xs: 6
    },
    label: "Last Name",
    props: {
      required: true
    },
    attribute: "lastName",
    component: "text-field",
    validations: {
      label: "Last Name",
      required: "Required"
    },
    validationType: "string"
  },
  {
    label: "Address Line 1",
    props: {
      required: true
    },
    attribute: "address1",
    component: "text-field",
    validations: {
      label: "Address 1",
      required: "Required"
    },
    validationType: "string"
  },
  {
    label: "Address Line 2",
    attribute: "address2",
    component: "text-field",
    validations: {
      label: "Address 2"
    },
    validationType: "string"
  },
  {
    col: {
      xs: 6
    },
    label: "City",
    attribute: "city",
    component: "text-field",
    validations: {
      label: "City"
    },
    validationType: "string"
  },
  {
    col: {
      xs: 6
    },
    label: "State",
    attribute: "state",
    component: "text-field",
    validations: {
      label: "State"
    },
    validationType: "string"
  },
  {
    col: {
      xs: 6
    },
    label: "Postcode",
    props: {
      required: true
    },
    attribute: "postcode",
    component: "text-field",
    validations: {
      label: "Postcode",
      required: "Required"
    },
    validationType: "string"
  },
  {
    col: {
      xs: 6
    },
    label: "Country",
    props: {
      required: true
    },
    attribute: "country",
    component: "text-field",
    validations: {
      label: "Country",
      required: "Required"
    },
    validationType: "string"
  },
  {
    options: [
      {
        label: "Same as Billing",
        value: true
      }
    ],
    optionConfig: {
      key: "label",
      label: "label",
      value: "value"
    },
    attribute: "sameAsBilling",
    component: "checkbox-group"
  }
];

async function validate(refs, form) {
  var errors = {};
  for (const [attribute, ref] of Object.entries(refs.current)) {
    if (ref.validate) {
      const error = await ref.validate(get(form, attribute));
      if (error.length) {
        errors[attribute] = error;
      }
    }
  }
  if (!isEmpty(errors)) {
    console.log(errors);
    return false;
  }
  return true;
}

export default function ShippingAddress() {
  const [form, setForm] = useState({});

  const refs = useRef({});

  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      copy[key] = value;
    }
    setForm(copy);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }
    console.log(form);
  };

  return (
    <>
      <FormBuilder
        fields={fields}
        form={form}
        updateForm={updateForm}
        refs={refs}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 1 }}
        onClick={handleNext}
      >
        Next
      </Button>

      <div style={{ marginTop: "16px" }}>{JSON.stringify(form, null, 2)}</div>
    </>
  );
}
