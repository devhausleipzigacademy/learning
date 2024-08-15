import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  url: string;
}

export const EmailTemplate = ({ firstName, url }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      You&apos;ve been invited to the Devhaus Learning Platform. Accept your
      invite <a href={url}>here</a>
    </p>
  </div>
);
