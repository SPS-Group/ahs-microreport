import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box !important;
    font-size: 13.35px;

    @media (max-width: 500px) {
      /* font-size: 12px; */
    }

    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    scrollbar-width: thin;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: transparent;
      scrollbar-width: thin;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      /*border-radius: 5px;*/
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #aaa;
    }
  }

  html, body, #root {
    min-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  body {
    background-color: #f7f7f7;
    box-sizing: border-box;

    @media (max-width: 500px) {
      background-color: #f7f7f7;
    }
  }

  /* body, input, button {
    font-family: "72","72full",Arial,Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  } */

  button {
    cursor: pointer;
  }


  input {
    background: transparent;
    outline: none;    
    -webkit-appearance: none;
    -moz-appearance: none;
    font-size: 0.9rem;
  }

    input[type=checkbox] {
      height: 20px !important;
      padding: 0;
      border: none !important;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
	    cursor: pointer;
      &:focus {
        border: none;
      }
    }

    input[type=checkbox]:before {
         content: "";
         display: block;
         position: absolute;
         width: 18px;
         height: 18px;
         top: 0;
         left: 0;
         border: 1px solid rgba(50, 54, 58, 0.2);
         border-radius: 5px;
         /* background-color: white; */
    }
    
    input[type=checkbox]:checked:after {
         content: "";
         display: block;
         width: 6px;
         height: 6px;
         border: solid #555;
         border-width: 0 2px 2px 0;
         -webkit-transform: rotate(45deg);
         -ms-transform: rotate(45deg);
         transform: rotate(45deg);
         position: absolute;
         top: 4px;
         left: 6px;
    }

  textarea {
    background: transparent;
    outline: none;    
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  a:link 
  { 
    text-decoration:none; 
  } 

  h1, h2 {
    font-weight: 600;
  }

  .react-confirm-alert-body {
    width: auto !important;
  }
`;
