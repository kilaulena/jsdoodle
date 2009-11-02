Then /^I should see "([^\"]*)" before "([^\"]*)"$/ do |first, second|
  div = $browser.div('main')
  unless div.html.match(/#{first}.*#{second}/im) 
    raise("#{first} can't be found before #{second}") 
  end
end