// Preferences.js

import React, { useCallback, memo } from 'react';
import Checkbox from '../../shared/Checkbox';

const Preferences = memo(function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const handlePreferenceChange = useCallback((preference) => {
    const updatedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter((pref) => pref !== preference)
      : [...selectedPreferences, preference];

    onPreferenceChange(updatedPreferences);
  }, [selectedPreferences, onPreferenceChange]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Preferências:</h2>
      <ul>
        {preferences.map((preference, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={preference}
              checked={selectedPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Preferences;
