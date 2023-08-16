import * as React from 'react';

export interface ILoadingSpinnerProps {
}

export function LoadingSpinner (props: ILoadingSpinnerProps) {
  return (
    <div>
      <div className="spinner">
        <div className="loader"></div>
      </div>
    </div>
  );
}
