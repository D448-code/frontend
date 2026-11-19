import  './App.css'
import {use, useState} from 'react'

function App() {
  const [weather, setWeather] = useState('晴れ')
  const [temperature, setTemperature] =useState('')
  const [outfits, setOutfits] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newWeather, setNewWeather] = useState('晴れ')
  const [newMinTemperature, setNewMinTemperature] = useState('')
  const [newMaxTemperature, setNewMaxTemperature] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('/setup.jpeg')

　　
  const handleSearch = async () => {
      if (temperature === '') {
          alert('気温を入力してください')
          return
      }

      setHasSearched(true)
      const url = `http://localhost:8080/outfits?weather=${weather}&temperature=${temperature}`
      const response = await fetch (url)
      if ( response.ok === false) {
          setOutfits([])
          return

      }
      const data = await response.json()
      setOutfits(Array.isArray(data) ? data : [])
  }
  　　//TOPへ戻る
      const handleReset = () => {
        setWeather('晴れ')
        setTemperature('')
        setOutfits([])
        setHasSearched(false)
      }

      const handleAddOutfit = async (e) => {
        e.preventDefault()
        if (!newName || !newMinTemperature === '' || newMaxTemperature === '') {
            alert('すべての項目を入力してください')
            return
        }

      const  newOutfit = {
            outfitName: newName,
            weather: newWeather,
            minTemperature: newMinTemperature,
            maxTemperature: newMaxTemperature,
            imageUrl: newImageUrl,
      }

      const response = await fetch('http://localhost:8080/outfits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOutfit)
      })

      if (response.ok ) {
          alert('新しいコーデを登録しました')
          setNewName('')
          setNewMinTemperature('')
          setNewMaxTemperature('')
          setShowAddForm(false)
          if (temperature !== '') {
              handleSearch()
          }
        }
      }

      const handleDeleteOutfit = async (id) => {
         if (!window.confim('このコーデを削除しますか？')) return
          const response = await fetch(`http://localhost:8080/outfits/${id}`, {
          method: 'DELETE'
          })
          if ( response.ok) {
          setOUtfits(outfits.filter((outfit) => outfit.outfitId !== id))
      }
    }  
    



      return (
      <div className="app-container">
      <header className="app-header">
         <img
           src="/banner.png"
           alt="Kids Corde"
           className="top-banner"
           onClick={handleReset}
          />
      </header>

        <div className="search-box">
        <div className="input-group">
        <label>天気</label>
        <select value={weather}
                onChange={(e) => setWeather(e.target.value)}
        >
          <option value="晴れ">晴れ☀️</option>
          <option value="曇り">曇り☁️</option>
          <option value="雨">雨☔</option>
      </select>
      </div>

      <div className="input-group">
          
        <label>気温(℃):</label>
        <input
            type="number"
            placeholder="例: 25"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
        />
      </div>

      <button className="search-button" onClick={handleSearch}>
         コーデを探す🔍✨
      </button>

      <button className="reset-button" onClick={handleReset}>
          TOPへ戻る🦢
      </button>

      <button
          className="add-toggle-button"
          onClick={() => setShowAddForm(!showAddForm)}
         >
          {showAddForm ? '閉じる×' : '+ コーデ登録'}
      </button>
        </div>
          {showAddForm && (
              <form className="add-form-box" onSubmit={handleAddOutfit}>
                  <h3>新しいコーデを登録🎈</h3>
                  <div className="add-form-grid">
                      <div className="input-group">
                          <label>お洋服の名前</label>
                          <input
                              type="text"
                              placeholder="例: カーディガン"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                             />
        </div>

        <div className="input-group">
           <label>天気</label>
               <select
                 value={newWeather}
                 onChange={(e) => setNewWeather(e.target.value)}
               >
                 <option value="晴れ">晴れ</option>
                  <option value="曇り">曇り</option>
                  <option value="雨">雨</option>
               </select>
        </div>

        <div className="input-group">
           <label>最低気温</label>
           <input
             type="number"
             placeholder="例:10"
             value={newMinTemperature}
             onChange={(e) => setNewMinTemperature(e.target.value)}
        />
        </div>

        <div className="input-group">
           <label>最高気温</label>
           <input
              type="number"
              placeholder="例:15"
              value={newMaxTemperature}
              onChange={(e) => setNewMaxTemperature(e.target.value)}
           />
        </div>

        <div className="input-group">
           <label>画像を選ぶ</label>
           <select
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
         >
            　<option value="/setup.jpeg">セットアップ</option>
            　<option value="/summer_dress.jpeg">夏ワンピ</option>
             <option value="/tshirt.jpeg">半袖トップス</option>
             <option value="/tanktop.jpeg">タンクトップ</option>
             <option value="/blouse.jpeg">ブラウス</option>
             <option value="/lomgsleeve.jpeg">ロングスリーヴ</option>
             <option value="/autumn_dress.jpeg">秋ワンピ</option>
             <option value="/down.jpeg">ダウン</option>
         </select>
         </div>
         </div>

                  <button
                      type="submit"
                      className="search-button"
                      style={{ marginTop: '16px' }}
                  >
                      この内容で登録する🍎
                  </button>
              </form>
          )}


          <div className="result-area">
            {hasSearched && outfits.length === 0 ? (
              <p>条件に合うお洋服がみつかりませんでした😢</p>
            ) : (
              <div className="outfit-grid">
                  {outfits.map((outfit) => (
                    <div className="outfit-card" key={outfit.outfitId}>
                      <img
                        src={outfit.imageUrl}
                        alt={outfit.outfitName}
                        className="outfit-image"
                      />
                      <div className="outfit-info">
                        <h2 className="outfit-name">{outfit.outfitName}</h2>
                        <p className="outfit-temp">
                          天気 : {outfit.weather}  ({outfit.minTemperature}℃～{outfit.maxTemperature}℃)
                         </p>

                          <button
                              className="delete-button"
                              onClick={() => handleDeleteOutfit(outfit.outfitId)}
                             >
                              削除
                             </button>
                      </div>
                    </div>
                   ))}
                 </div>
                )}
             </div>
           </div>
          )
         }

        export default App
