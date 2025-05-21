import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Family from './Family';
import TextArea from './TextArea';
import axios from 'axios'

const urllocal = `http://localhost:5000`

const Registration = () => {
  const [selected, setSelected] = useState('');

  const getSelectedValue = (item) => {
    setSelected(item);
    console.log(item);
  };

  const registerAction = (formData) => {
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
    const martialStatus = formData.get('martialstatus');

    const churMem = {
      memberid:memberId,
      firstname: firstName,
      lastname: lastName,
      middlename: middleName,
      email: email,
      phone: phone,
      martialstatus: martialStatus,
      city: city,
      province: province,
      postalcode: postalCode,
      address: address,
      startdate: startDate,
      membershipfee: membershipFee,
      membershiptype: membershipType,
    };

    console.log(churMem);

    axios.post(`${urllocal}/api/members`,churMem).then(()=>console.log('success')).catch((err)=>console.log(err))
  };

  return (
    <div className="w-9/10 m-auto flex flex-col  items-center">
      <h2 className=" text-2xl font-bold">Registration - Form</h2>
      <form
        className=" bg-stone-300 px-6 py-4 rounded space-y-2"
        action={registerAction}
      >
        <div
          className=" flex justify-between items-start gap-3   py-1 rounded h-3/4
        "
        >
          <fieldset className="border-blue-500 border px-2 pb-2">
            <legend className="font-semibold text-blue-700">
              Personal Information
            </legend>
            <Input type="text" label="ID No." name="memid" />

            <Input type="text" label="First Name" name="firstname" />
            <Input type="text" label="Middle Name" name="middlename" />
            <Input type="text" label="Last Name" name="lastname" />
            <Input type="email" label="Email" name="email" />
            <Input type="tel" label="Phone Number" name="phone" />
            <Select
              label="Martial Status"
              name="martialstatus"
              options={['Married', 'Not Married']}
            />
          </fieldset>

          <fieldset className="border-blue-500 border px-2  pb-2">
            <legend className="font-semibold text-blue-700">
              Address Information
            </legend>
            <Input type="text" label="City" name="city" />
            <Input type="text" label="Province" name="province" />
            <Input type="text" label="Postal- Code" name="postalcode" />
            <TextArea label="Addresss" name="address" />
          </fieldset>

          <div>
            <fieldset className=" border-blue-500 border rounded px-2 py-3 space-y-2.5">
              <legend className="text-blue-700 font-semibold">
                Membership
              </legend>
              <Input type="date" label="Start Date" name="startdate" />
              <Select
                label="Type"
                name="memtype"
                options={['Single', 'Family']}
                onChange={(e) => getSelectedValue(e.target.value)}
              />
              {selected === 'Family' && <Family />}
              <Select label="Fee Paid" name="memfee" options={['Yes', 'No']} />
            </fieldset>
          </div>
        </div>

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
