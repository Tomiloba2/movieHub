import * as React from 'react';

export interface IErrorProps {
    message:any
}

export function Error (props: IErrorProps) {
  return (
    <div>
      <div className="error-boundary">
        <div>
            <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
