function(doc) {
  if(doc['type'] == 'Poll') {
    emit(doc['title'], null);
  };
};