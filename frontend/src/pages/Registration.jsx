import Input from '../components/Input';
import Select from '../components/Select';
import Spouse from '../components/Spouse';
import TextArea from '../components/TextArea';
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import MyContext from '../components/MyContext';
// import FileUpload from '../components/FileUpload';

const Registration = () => {
  const { setIsAdminOpen } = useContext(MyContext);

  useEffect(() => {
    setIsAdminOpen(false);
  }, [setIsAdminOpen]);

  const [enteredValues, setEnteredValues] = useState({
    memberId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    maritalStatus: '',
    city: '',
    province: '',
    postalCode: '',
    address: '',
    startDate: '',
    membershipType: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseMiddleName: '',
  });

  const [isValid, setIsValid] = useState({
    memberId: true,
    firstName: true,
    middleName: true,
    lastName: true,
    email: true,
    phone: true,
    maritalStatus: true,
    city: true,
    province: true,
    postalCode: true,
    address: true,
    startDate: true,
    membershipType: true,
    spouseFirstName: true,
    spouseLastName: true,
    spouseMiddleName: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(enteredValues);
    const firstNameIsValid = enteredValues.firstName !== '';
    const middleNameIsValid = enteredValues.middleName !== '';
    const lastNameIsValid = enteredValues.lastName !== '';
    const memberIdIsValid = enteredValues.memberId !== '';
    const emailIsValid = enteredValues.email.includes('@');
    const phoneIsValid = enteredValues.phone !== '';
    const maritalStatusIsValid = enteredValues.maritalStatus !== '';
    const cityIsValid = enteredValues.city !== '';
    const provinceIsValid = enteredValues.province !== '';
    const postalCodeIsValid = enteredValues.postalCode !== '';
    const addressIsValid = enteredValues.address !== '';
    const startDateIsValid = enteredValues.startDate !== '';
    const membershipTypeIsValid = enteredValues.membershipType !== '';
    const spouseFirstNameIsValid = enteredValues?.spouseFirstName !== '';
    const spouseMiddleNameIsValid = enteredValues?.spouseMiddleName !== '';
    const spouseLastNameIsValid = enteredValues?.spouseLastName !== '';

    if (!memberIdIsValid) {
      setIsValid((prev) => ({
        ...prev,
        memberId: false,
      }));
    }
    if (!firstNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        firstName: false,
      }));
    }
    if (!middleNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        middleName: false,
      }));
    }
    if (!lastNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        lastName: false,
      }));
    }
    if (!emailIsValid) {
      setIsValid((prev) => ({
        ...prev,
        email: false,
      }));
    }
    if (!phoneIsValid) {
      setIsValid((prev) => ({
        ...prev,
        phone: false,
      }));
    }
    if (!maritalStatusIsValid) {
      setIsValid((prev) => ({
        ...prev,
        maritalStatus: false,
      }));
    }
    if (!cityIsValid) {
      setIsValid((prev) => ({
        ...prev,
        city: false,
      }));
    }
    if (!provinceIsValid) {
      setIsValid((prev) => ({
        ...prev,
        province: false,
      }));
    }
    if (!postalCodeIsValid) {
      setIsValid((prev) => ({
        ...prev,
        postalCode: false,
      }));
    }
    if (!addressIsValid) {
      setIsValid((prev) => ({
        ...prev,
        address: false,
      }));
    }
    if (!startDateIsValid) {
      setIsValid((prev) => ({
        ...prev,
        startDate: false,
      }));
    }
    if (!membershipTypeIsValid) {
      setIsValid((prev) => ({
        ...prev,
        membershipType: false,
      }));
    }
    if (!spouseFirstNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        spouseFirstName: false,
      }));
    }
    if (!spouseMiddleNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        spouseMiddleName: false,
      }));
    }
    if (!spouseLastNameIsValid) {
      setIsValid((prev) => ({
        ...prev,
        spouseLastName: false,
      }));
    }

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !middleNameIsValid ||
      !emailIsValid ||
      !memberIdIsValid ||
      !phoneIsValid ||
      !maritalStatusIsValid ||
      !cityIsValid ||
      !provinceIsValid ||
      !postalCodeIsValid ||
      !addressIsValid ||
      !startDateIsValid ||
      !membershipTypeIsValid ||
      (enteredValues.membershipType === 'Family' &&
        (!spouseFirstNameIsValid ||
          !spouseMiddleNameIsValid ||
          !spouseLastNameIsValid))
    )
      return;

    setIsValid({
      memberId: true,
      firstName: true,
      middleName: true,
      lastName: true,
      email: true,
      phone: true,
      maritalStatus: true,
      city: true,
      province: true,
      postalCode: true,
      address: true,
      startDate: true,
      membershipType: true,
      spouseFirstName: true,
      spouseLastName: true,
      spouseMiddleName: true,
    });

    const churMem = {
      memberid: enteredValues.memberId,
      firstname: enteredValues.firstName,
      lastname: enteredValues.lastName,
      middlename: enteredValues.middleName,
      email: enteredValues.email,
      phone: enteredValues.phone,
      maritalstatus: enteredValues.maritalStatus,
      city: enteredValues.city,
      province: enteredValues.province,
      postalcode: enteredValues.postalCode,
      address: enteredValues.address,
      startdate: enteredValues.startDate,
      membershiptype: enteredValues.membershipType,
      ...(enteredValues.membershipType === 'Family' && {
        spouse: {
          spousefirstname: enteredValues.spouseFirstName,
          spousemiddlename: enteredValues.spouseMiddleName,
          spouselastname: enteredValues.spouseLastName,
        },
      }),
    };

    //create a member in the database
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/members`, churMem)
      .then(() => {
        setEnteredValues({
          memberId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          phone: '',
          maritalStatus: '',
          city: '',
          province: '',
          postalCode: '',
          address: '',
          startDate: '',
          membershipType: '',
          spouseFirstName: '',
          spouseLastName: '',
          spouseMiddleName: '',
        });

        //success message
        toast.success('Registration successful!');
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      })
      .catch(() => {
        //error message
        toast.error('Something went wrong.')
      });
  };

  const handleChange = (identifier, value) => {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="w-11/12 md:w-3/4 px-6 py-2 rounded-lg  space-y-4 border bg-stone-50">
        <h2 className=" text-2xl font-bold py-2 text-center">
          Registration - Form
        </h2>
        <form className="space-y-6 w-full " onSubmit={handleSubmit}>
          <div className="flex justify-around flex-wrap gap-4">
            <fieldset className=" border-1 px-6 pb-2 rounded-lg">
              <legend className="font-semibold ">Personal Information</legend>
              <Input
                type="text"
                label="ID No."
                name="memberId"
                onChange={handleChange}
                value={enteredValues.memberId}
              />
              {!isValid.memberId && (
                <p className="text-red-500 text-right">
                  Please provide member id.
                </p>
              )}
              <Input
                type="text"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={enteredValues.firstName}
              />
              {!isValid.firstName && (
                <p className="text-red-500 text-right">
                  Please provide firstname.
                </p>
              )}
              <Input
                type="text"
                label="Middle Name"
                name="middleName"
                onChange={handleChange}
                value={enteredValues.middleName}
              />
              {!isValid.middleName && (
                <p className="text-red-500 text-right">
                  Please provide middlename.
                </p>
              )}
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={enteredValues.lastName}
              />
              {!isValid.lastName && (
                <p className="text-red-500 text-right">
                  Please provide lastname.
                </p>
              )}
              <Input
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={enteredValues.email}
              />
              {!isValid.email && (
                <p className="text-red-500 text-right">
                  provide valid email address.
                </p>
              )}
              <Input
                type="tel"
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={enteredValues.phone}
              />
              {!isValid.phone && (
                <p className="text-red-500 text-right">
                  provide valid phone number.
                </p>
              )}
              <Select
                label="Marital Status"
                name="maritalStatus"
                options={['Married', 'Not Married']}
                onChange={handleChange}
                value={enteredValues.maritalStatus}
              />
              {!isValid.maritalStatus && (
                <p className="text-red-500 text-right">provide valid status.</p>
              )}
            </fieldset>

            <fieldset className=" border-1 px-6 rounded-lg pb-2">
              <legend className="font-semibold ">Address Information</legend>
              <Input
                type="text"
                label="City"
                name="city"
                onChange={handleChange}
                value={enteredValues.city}
              />
              {!isValid.city && (
                <p className="text-red-500 text-right">provide valid city.</p>
              )}
              <Input
                type="text"
                label="Province"
                name="province"
                onChange={handleChange}
                value={enteredValues.province}
              />
              {!isValid.province && (
                <p className="text-red-500 text-right">
                  provide valid province.
                </p>
              )}
              <Input
                type="text"
                label="Postal- Code"
                name="postalCode"
                onChange={handleChange}
                value={enteredValues.postalCode}
              />
              {!isValid.postalCode && (
                <p className="text-red-500 text-right">
                  provide valid postal code.
                </p>
              )}
              <TextArea
                label="Addresss"
                name="address"
                onChange={handleChange}
                value={enteredValues.address}
              />
              {!isValid.address && (
                <p className="text-red-500 text-right">
                  provide valid address.
                </p>
              )}
            </fieldset>

            <div>
              <fieldset className="  border-1 rounded-lg px-6 pb-2">
                <legend className=" font-semibold">Membership</legend>
                <Input
                  type="date"
                  label="Start Date"
                  name="startDate"
                  onChange={handleChange}
                  value={enteredValues.startDate}
                />
                {!isValid.startDate && (
                  <p className="text-red-500 text-right">
                    provide valid start date.
                  </p>
                )}
                <Select
                  label="Type"
                  name="membershipType"
                  options={['Single', 'Family']}
                  onChange={handleChange}
                  value={enteredValues.membershipType}
                />
                {!isValid.membershipType && (
                  <p className="text-red-500 text-right">
                    provide valid value.
                  </p>
                )}
                {/* {console.log(enteredValues.membershipType)} */}
                {enteredValues.membershipType === 'Family' && (
                  <Spouse
                    sp={{
                      fn: enteredValues?.spouseFirstName,
                      mn: enteredValues?.spouseMiddleName,
                      ln: enteredValues?.spouseLastName,
                    }}
                    onChange={handleChange}
                    firstnameset={isValid?.spouseFirstName}
                    middlenameset={isValid?.spouseMiddleName}
                    lastnameset={isValid?.spouseLastName}
                  />
                )}
              </fieldset>
            </div>
            {/* <FileUpload /> */}
          </div>
          <button
            className=" justify-start border rounded-lg px-6 py-2 w-1/2 m-auto block bg-white text-dark text-lg hover:cursor-pointer hover:bg-dark hover:text-white mt-4"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
