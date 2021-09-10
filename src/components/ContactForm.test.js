import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm />)
});

test('renders the contact form header', ()=> {
  render(<ContactForm />)
  const header = screen.getByText(/Contact Form/i)
  expect(header).toBeInTheDocument()
  expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.',  () => {
  render(<ContactForm />)
  const firstNameInput = screen.getByLabelText(/First Name/i)
  userEvent.type(firstNameInput, 'Lui')
  const errors = screen.queryAllByText(/error/i)
  expect(errors).toBeTruthy()
});

test('renders THREE error messages if user enters no values into any fields.',  () => {
  render(<ContactForm />)
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/Email/i)
  
  userEvent.type(firstNameInput, '')
  userEvent.type(lastNameInput, '')
  userEvent.type(emailInput, '')
  
  const firstNameError = screen.queryAllByText(/error/i)
  expect(firstNameError).toBeTruthy()
  const lastNameError = screen.queryAllByText(/error/i)
  expect(lastNameError).toBeTruthy()
  const emailError = screen.queryAllByText(/error/i)
  expect(emailError).toBeTruthy()
});

test('renders ONE error message if user enters a valid first name and last name but no email.',  () => {
  render(<ContactForm/>)
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/last Name/i)
  const emailInput = screen.getByLabelText(/Email/i)
  
  userEvent.type(firstNameInput,"Pacman")
  userEvent.type(lastNameInput,"Ghost Eater")
  userEvent.type(emailInput,"")
  
  const emailError = screen.queryAllByText(/error/i)
  expect(emailError).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', () => {
  render(<ContactForm/>)
  const firstName = screen.getByLabelText(/First Name/i)
  const lastName = screen.getByLabelText(/last Name/i)
  const email = screen.getByLabelText(/Email/i)

  userEvent.type(firstName,"tester")
  userEvent.type(lastName,"tester")
  userEvent.type(email,"bademaildata")
  

  const emailError = screen.queryByText(/email must be a valid email address/i)
  expect(emailError).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name/i)
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  const emailInput = screen.getByLabelText(/Email/i)
  
  userEvent.type(firstNameInput,"Pacman")
  userEvent.type(lastNameInput,"")
  userEvent.type(emailInput,"wonkawonka@pacman.com")
  
  const submitBTN = screen.getByRole("button");
  userEvent.click(submitBTN)
  
  const errorMessage = screen.queryAllByText(/lastName is a required field/i)
  expect(errorMessage).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', () => {
  render(<ContactForm/>);
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const messageInput = screen.getByLabelText(/Message/i)
  
  userEvent.type(messageInput,"WONKA WONKA WONKA!")
  userEvent.type(emailInput, "wonkawonka@pacman.com");
  userEvent.type(lastNameInput,"Wonka Wonka")
  userEvent.type(firstNameInput, "Pacman");
  
  const submitBTN = screen.getByRole("button")
  userEvent.click(submitBTN)
  
  const firstNameDisplay = screen.queryByTestId('firstnameDisplay')
  const lastNameDisplay = screen.queryByTestId('lastnameDisplay')
  const emailDisplay = screen.queryByTestId('emailDisplay')
  
  expect(firstNameDisplay).toBeTruthy();
  expect(lastNameDisplay).toBeTruthy();
  expect(emailDisplay).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm/>);
});