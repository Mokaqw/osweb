import { useCallback, useRef, useState ,container ,Search } from 'react'
import Link from 'next/link'
import baseUrl from "../utils/baseUrl"

export default function SearchText() {

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `${baseUrl}/api/product${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      className={container}
      ref={searchRef}
    >
      <input
        className={Search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Search '
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={results}>
          {results.map(({ id, title }) => (
            <li className={result} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}