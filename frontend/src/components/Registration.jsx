import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Spouse from './Spouse';
import TextArea from './TextArea';
import axios from 'axios';
import { useActionState } from 'react';
import { isEmail, isEmpty } from '../util/validation';

const urllocal = `http://localhost:5000`;

const Registration = () => {
  const [selected, setSelected] = useState('');

  const getSelectedValue = (item) => {
    setSelected(item);
    console.log(item);
  };

  const registerAction = (prevFormState, formData) => {
    const memberId = formData.get('memid');
    const firstName = formData.get('firstname');
    const middleName = formData.get('middlename');
    const lastName = formData.get('lastname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const city = formData.get('city');
    const province = formData.get('province');
    const postalCode = formData.get('postalcode');
    const address = formData.get('address');
    const startDate = formData.get('startdate');
    const membershipType = formData.get('memtype');
    const membershipFee = formData.get('memfee');
    const maritalStatus = formData.get('maritalstatus');

    const churMem = {
      memberid: memberId,
      firstname: firstName,
      lastname: lastName,
      middlename: middleName,
      email: email,
      phone: phone,
      maritalstatus: maritalStatus,
      city: city,
      province: province,
      postalcode: postalCode,
      address: address,
      startdate: startDate,
      membershipfee: membershipFee,
      membershiptype: membershipType,
    };

    let errors = [];

    if (isEmpty(memberId)) {
      errors.push('Please provide member Id');
    }
    if (!isEmail(email)) {
      errors.push('Invalid email address');
    }
    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(middleName)) {
      errors.push('Please provide Firstname , lastname and middlename');
    }
    if (
      isEmpty(city) ||
      isEmpty(province) ||
      isEmpty(postalCode) ||
      isEmpty(address)
    ) {
      errors.push('Please provide City , province , postalcode and  address');
    }
    if (isEmpty(phone)) {
      errors.push('Please provide phone number');
    }
    if (
      isEmpty(maritalStatus) ||
      isEmpty(membershipFee) ||
      isEmpty(membershipType)
    ) {
      errors.push(
        'please provide martial status, membership fee and membership '
      );
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          memberId,
          firstName,
          middleName,
          lastName,
          email,
          phone,
          city,
          province,
          address,
          maritalStatus,
          postalCode,
          startDate,
          membershipFee,
          membershipType,
        },
      };
    }

    axios
      .post(`${urllocal}/api/members`, churMem)
      .then(() => console.log('success'))
      .catch((err) => console.log(err));

    return { errors: null };
  };
  const [formState, formAction] = useActionState(registerAction, {
    errors: null,
  });

  return (
    <div className="w-9/10 m-auto flex flex-col  items-center">
      <h2 className=" text-2xl font-bold py-2">Registration - Form</h2>
      <form
        className=" bg-stone-200 px-6 py-4 rounded space-y-2"
        action={formAction}
      >
        <div
          className=" flex justify-between items-start gap-3   py-1 rounded h-3/4
        "
        >
          <fieldset className="border-white border-2 px-2 pb-2">
            <legend className="font-semibold text-blue-700">
              Personal Information
            </legend>
            <Input type="text" label="ID No." name="memid" defval={formState.enteredValues?.memberId} />

            <Input type="text" label="First Name" name="firstname" defval={formState.enteredValues?.firstName}/>
            <Input type="text" label="Middle Name" name="middlename"defval={formState.enteredValues?.middleName} />
            <Input type="text" label="Last Name" name="lastname" defval={formState.enteredValues?.lastName} />
            <Input type="email" label="Email" name="email" defval={formState.enteredValues?.email} />
            <Input type="tel" label="Phone Number" name="phone" defval={formState.enteredValues?.phone} />
            <Select
              label="Marital Status"
              name="maritalstatus"
              options={['Married', 'Not Married']}
    
            />
          </fieldset>

          <fieldset className="border-white border-2 px-2  pb-2">
            <legend className="font-semibold text-blue-700">
              Address Information
            </legend>
            <Input type="text" label="City" name="city"  defval={formState.enteredValues?.city}/>
            <Input type="text" label="Province" name="province" defval={formState.enteredValues?.province} />
            <Input type="text" label="Postal- Code" name="postalcode"  defval={formState.enteredValues?.postalCode}/>
            <TextArea label="Addresss" name="address"  defval={formState.enteredValues?.address}/>
          </fieldset>

          <div>
            <fieldset className=" border-white border-2 rounded px-2 py-3 space-y-2.5">
              <legend className="text-blue-700 font-semibold">
                Membership
              </legend>
              <Input type="date" label="Start Date" name="startdate" defval={formState.enteredValues?.startDate} />
              <Select
                label="Type"
                name="memtype"
                options={['Single', 'Family']}
                onChange={(e) => getSelectedValue(e.target.value)}
              />
              {selected === 'Family' && <Spouse />}
              <Select label="Fee Paid" name="memfee" options={['Yes', 'No']} />
            </fieldset>
          </div>
        </div>

        {formState.errors && (
          <ul className=" text-red-500 mt-3 list-disc list-inside space-y-1">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <button
          className=" justify-start border rounded px-6 py-1 w-1/2 m-auto block bg-blue-600 text-white text-lg hover:cursor-pointer hover:bg-blue-500 mt-4
        "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
