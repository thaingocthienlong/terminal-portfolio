import React from 'react';

const OutputText = ({ children }: { children: React.ReactNode }) => (
  <p className="animate-fade-in my-1 leading-relaxed">{children}</p>
);

export default OutputText;
