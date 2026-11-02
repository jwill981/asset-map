type FormActionsProps = {
  onCancel: () => void;
};

export function FormActions({ onCancel }: FormActionsProps) {
  return (
    <div className="form-actions">
      <button type="submit" className="primary-button">
        Save
      </button>
      <button type="button" className="secondary-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
