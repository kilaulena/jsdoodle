Given /^a poll with title "([^\"]*)" and choices "([^\"]*)"$/ do |title, choices|
  When 'I go to the start page'  
  And 'I follow "Create a poll"'  
  And "I fill in \"Title\" with \"#{title}\""
  choices.split(',').map(&:strip).each_with_index do |choice, index|
    And "I fill in \"Choice #{index+1}\" with \"#{choice}\""
  end
  And 'I press "Save"'
end

Then /^"([^\"]*)" should have the class "([^\"]*)"$/ do |element_id, css_class|
  find_input(:text_field, element_id).attribute_value(:class).should include(css_class)
end

Then /^"([^\"]*)" should not have the class "([^\"]*)"$/ do |element_id, css_class|
  find_input(:text_field, element_id).attribute_value(:class).should_not include(css_class)
end

def find_input(type, attribute)
  matchers = [[attribute, :id], [attribute, :name]]
  matchers << [$browser.label(:text, attribute).for, :id] if $browser.label(:text, attribute).exist?
  matchers.map{|field, matchter| $browser.send(type, matchter, field)}.find(&:exist?) ||  raise("#{type} '#{attribute}' not found")
end